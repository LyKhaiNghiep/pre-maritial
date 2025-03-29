import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import userQuizService from '../../services/userQuizService';

const QuizSession = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  
  const [userGender, setUserGender] = useState('BOTH');
  
  useEffect(() => {
    console.log("Quiz ID from params:", quizId);
    fetchQuiz();
  }, [quizId]);
  
  const fetchQuiz = async () => {
    if (!quizId || quizId === 'undefined') {
      setError('No valid quiz ID provided. Please go back and select a quiz.');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const data = await userQuizService.getQuizWithQuestions(quizId);
      setQuiz(data);
      
      const initialAnswers = {};
      if (data.quizQuestions) {
        data.quizQuestions.forEach(quizQuestion => {
          if (
            quizQuestion.question.forGender === 'BOTH' || 
            quizQuestion.question.forGender === userGender
          ) {
            initialAnswers[quizQuestion.question.questionId] = null;
          }
        });
      }
      setAnswers(initialAnswers);
      
      setError(null);
    } catch (err) {
      setError('Failed to load quiz. Please try again.');
      console.error('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const getFilteredQuestions = () => {
    if (!quiz || !quiz.quizQuestions) return [];
    
    return quiz.quizQuestions.filter(quizQuestion => 
      quizQuestion.question.forGender === 'BOTH' || 
      quizQuestion.question.forGender === userGender
    );
  };
  
  const handleAnswerChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };
  
  const handleNext = () => {
    const filteredQuestions = getFilteredQuestions();
    if (activeStep < filteredQuestions.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };
  
  const handleBack = () => {
    setActiveStep(activeStep > 0 ? activeStep - 1 : 0);
  };
  
  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };
  
  const handleSubmitQuiz = async () => {
    setShowConfirmDialog(false);
    setSubmitting(true);
    
    try {
      const submissionData = {
        quizId: parseInt(quizId, 10),
        submissions: Object.entries(answers).map(([questionId, optionId]) => ({
          questionId: parseInt(questionId, 10),
          optionId: optionId
        }))
      };
      
      const result = await userQuizService.submitQuizAnswers(submissionData);
      setQuizResult(result);
      setCompleted(true);
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error('Error submitting quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleBackToQuizzes = () => {
    navigate('/customer-home/quizzes');
  };
  
  const calculateProgress = () => {
    const totalQuestions = getFilteredQuestions().length;
    if (totalQuestions === 0) return 0;
    
    const answeredCount = Object.values(answers).filter(a => a !== null).length;
    return (answeredCount / totalQuestions) * 100;
  };
  
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBackToQuizzes}>
          Back to Quizzes
        </Button>
      </Container>
    );
  }
  
  if (completed && quizResult) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box textAlign="center" mb={4}>
          <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Quiz Completed!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Thank you for completing the quiz "{quizResult.title}"
          </Typography>
        </Box>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Advice Based on Your Choice:
            </Typography>
            <Typography variant="body1" paragraph>
              {quizResult.adviceText || "No specific advice available for your score."}
            </Typography>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToQuizzes}
            size="large"
          >
            Back to Quizzes
          </Button>
        </Box>
      </Container>
    );
  }
  
  // Render the quiz taking interface
  const filteredQuestions = getFilteredQuestions();
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBackToQuizzes}
          sx={{ mr: 2 }}
        >
          Exit Quiz
        </Button>
        <Typography variant="h5" component="h1">
          {quiz?.title}
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Progress: {Math.round(calculateProgress())}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress()} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Question {activeStep + 1} of {filteredQuestions.length}
        </Typography>
        
        {filteredQuestions.length > 0 && activeStep < filteredQuestions.length && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
              {filteredQuestions[activeStep].question.questionText}
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={answers[filteredQuestions[activeStep].question.questionId] || ''}
                onChange={(e) => handleAnswerChange(
                  filteredQuestions[activeStep].question.questionId,
                  parseInt(e.target.value, 10)
                )}
              >
                {filteredQuestions[activeStep].question.questionOption.map((option) => (
                  <FormControlLabel
                    key={option.optionId}
                    value={option.optionId}
                    control={<Radio />}
                    label={option.optionText}
                    sx={{ mb: 1 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={answers[filteredQuestions[activeStep]?.question.questionId] === null}
          >
            {activeStep === filteredQuestions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={showConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Submit Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit your answers? You cannot change them after submission.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitQuiz} 
            variant="contained" 
            color="primary"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizSession;
