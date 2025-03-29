import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Divider,
  Snackbar
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import HistoryIcon from '@mui/icons-material/History';
import userQuizService from '../../services/userQuizService';

const UserQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    fetchAvailableQuizzes();
  }, []);

  const fetchAvailableQuizzes = async () => {
    setLoading(true);
    try {
      const data = await userQuizService.getAvailableQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError('Failed to load available quizzes. Please try again later.');
      console.error('Error loading quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quiz) => {
    console.log("Starting quiz with quiz object:", quiz);
    const quizId = quiz.quizId || quiz.id || quiz.quiz_id;
    
    if (!quizId) {
      console.error("Attempted to start quiz with invalid ID. Quiz object:", quiz);
      setNotification({
        open: true,
        message: "Cannot start quiz: invalid quiz ID",
        severity: "error",
      });
      return;
    }
    navigate(`/customer-home/quiz/${quizId}`);
  };

  const handleViewHistory = () => {
    navigate('/customer-home/quiz-history');
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Available Quizzes
          </Typography>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={handleViewHistory}
          >
            View Quiz History
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : quizzes.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 5,
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No quizzes available at this time.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please check back later for new quizzes.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {quizzes.map((quiz) => (
              <Grid item key={quiz.quizId} xs={12} md={6} lg={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <QuizIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h2">
                        {quiz.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {quiz.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2">
                        <strong>Questions:</strong> {quiz.questionsCount || quiz.quizQuestions?.length || 0}
                      </Typography>
                      <Chip
                        label={`By: ${quiz.therapistName || 'Therapist'}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        console.log("Quiz data:", quiz);
                        handleStartQuiz(quiz);
                      }}
                    >
                      Start Quiz
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({...notification, open: false})}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={() => setNotification({...notification, open: false})} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserQuizzes; 