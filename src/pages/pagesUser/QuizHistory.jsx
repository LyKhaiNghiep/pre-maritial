import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import userQuizService from '../../services/userQuizService';
import { format } from 'date-fns';

const QuizHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizHistory();
  }, []);

  const fetchQuizHistory = async () => {
    setLoading(true);
    try {
      const data = await userQuizService.getQuizHistory();
      setHistory(data);
      setError(null);
    } catch (err) {
      setError('Failed to load quiz history. Please try again.');
      console.error('Error loading quiz history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToQuizzes = () => {
    navigate('/customer-home/quizzes');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToQuizzes}
          sx={{ mr: 2 }}
        >
          Back to Quizzes
        </Button>
        <Typography variant="h4" component="h1">
          Quiz History
        </Typography>
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
      ) : history.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You haven't completed any quizzes yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToQuizzes}
            sx={{ mt: 2 }}
          >
            Take Your First Quiz
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz Name</TableCell>
                <TableCell>Date Completed</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{formatDate(item.attemptedTime)}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<AssessmentIcon />}
                        onClick={() => {
                          // Toggle expanded row
                          const expanded = document.getElementById(`details-${item.id}`);
                          if (expanded) {
                            expanded.style.display = expanded.style.display === 'none' ? 'table-row' : 'none';
                          }
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow id={`details-${item.id}`} style={{ display: 'none' }}>
                    <TableCell colSpan={4}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Results Summary
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle1" gutterBottom>
                          Advice Based on Choices:
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ pl: 2 }}>
                          {item.adviceText || "No specific advice available for this score range."}
                        </Typography>
                        
                        {item.submissions && item.submissions.length > 0 && (
                          <>
                            <Typography variant="subtitle1" gutterBottom>
                              Your Answers:
                            </Typography>
                            {item.submissions.map((submission, index) => (
                              <Accordion key={index} sx={{ mb: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography>
                                    Question {index + 1}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography variant="body2" color="text.secondary">
                                    Option ID: {submission.optionId}
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default QuizHistory; 