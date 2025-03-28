import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardContent,
  Grid,
  Chip,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import quizService from "../../services/quizService";
import questionService from "../../services/questionService";

// This component displays the therapist's quizzes.
// Replace mock data with API calls (e.g., fetchTherapistQuizzes) when ready.
const TherapistQuiz = () => {
  const navigate = useNavigate();

  // State variables
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isActive: true,
    advices: [],
    existingQuestionIds: [],
    newQuestions: [],
  });

  // New question state
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    forGender: "BOTH",
    options: [{ optionText: "", point: 0 }],
  });

  // New advice state
  const [newAdvice, setNewAdvice] = useState({
    adviceText: "",
    fromPoint: 0,
    toPoint: 10,
  });

  // Fetch quizzes on component mount
  useEffect(() => {
    fetchQuizzes();
    fetchExistingQuestions();
  }, []);

  // Fetch quizzes from API
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await quizService.getMyQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch quizzes. Please try again.");
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing questions
  const fetchExistingQuestions = async () => {
    try {
      const questions = await questionService.getAllQuestions();
      setExistingQuestions(questions);
    } catch (err) {
      console.error("Error fetching questions:", err);
      // Fallback to mock data if API fails
      const mockQuestions = [
        { questionId: 1, questionText: "How well do you communicate?" },
        { questionId: 2, questionText: "How do you handle conflicts?" },
        { questionId: 3, questionText: "How important is personal space?" },
        { questionId: 4, questionText: "How do you manage finances?" },
      ];
      setExistingQuestions(mockQuestions);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isActive" ? checked : value,
    });
  };

  // Handle changes to the new question form
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  // Handle changes to question options
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: field === "point" ? parseInt(value, 10) : value,
    };
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  // Add new option to the current question
  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { optionText: "", point: 0 }],
    });
  };

  // Remove option from the current question
  const handleRemoveOption = (index) => {
    const filteredOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion({
      ...newQuestion,
      options: filteredOptions,
    });
  };

  // Add the current question to the form data
  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      newQuestions: [...formData.newQuestions, newQuestion],
    });
    // Reset the new question form
    setNewQuestion({
      questionText: "",
      forGender: "BOTH",
      options: [{ optionText: "", point: 0 }],
    });
  };

  // Remove a question from formData
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...formData.newQuestions];
    updatedQuestions.splice(index, 1);
    setFormData({
      ...formData,
      newQuestions: updatedQuestions,
    });
  };

  // Handle changes to the existing question selections
  const handleExistingQuestionChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      existingQuestionIds: value,
    });
  };

  // Handle changes to advice fields
  const handleAdviceChange = (e) => {
    const { name, value } = e.target;
    setNewAdvice({
      ...newAdvice,
      [name]: name === "adviceText" ? value : parseInt(value, 10),
    });
  };

  // Add new advice
  const handleAddAdvice = () => {
    setFormData({
      ...formData,
      advices: [...formData.advices, newAdvice],
    });
    // Reset the new advice form
    setNewAdvice({
      adviceText: "",
      fromPoint: 0,
      toPoint: 10,
    });
  };

  // Remove advice
  const handleRemoveAdvice = (index) => {
    const updatedAdvices = [...formData.advices];
    updatedAdvices.splice(index, 1);
    setFormData({
      ...formData,
      advices: updatedAdvices,
    });
  };

  // Open create dialog
  const handleOpenCreateDialog = () => {
    setFormData({
      title: "",
      description: "",
      isActive: true,
      advices: [],
      existingQuestionIds: [],
      newQuestions: [],
    });
    setActiveStep(0);
    setOpenCreateDialog(true);
  };

  // Open edit dialog
  const handleOpenEditDialog = (quiz) => {
    setCurrentQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      isActive: quiz.active,
      advices: quiz.advices || [],
      existingQuestionIds: quiz.quizQuestions?.map(qq => qq.question.questionId) || [],
      removeQuestionIds: [],
      newQuestions: [],
    });
    setActiveStep(0);
    setOpenEditDialog(true);
  };

  // Close all dialogs
  const handleCloseDialogs = () => {
    setOpenCreateDialog(false);
    setOpenEditDialog(false);
    setCurrentQuiz(null);
    setActiveStep(0);
  };

  // Handle next step in multi-step form
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle previous step in multi-step form
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Create new quiz
  const handleCreateQuiz = async () => {
    setLoading(true);
    try {
      // Ensure we're using the correct field names that match the DTO
      const quizData = {
        title: formData.title,
        description: formData.description,
        existingQuestionIds: formData.existingQuestionIds,
        newQuestions: formData.newQuestions,
        advices: formData.advices,
      };
      
      await quizService.createQuiz(quizData);
      
      setNotification({
        open: true,
        message: "Quiz created successfully!",
        severity: "success",
      });
      
      handleCloseDialogs();
      fetchQuizzes(); // Refresh the quiz list
    } catch (err) {
      setError("Failed to create quiz. Please try again.");
      console.error("Error creating quiz:", err);
      
      setNotification({
        open: true,
        message: "Failed to create quiz. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update existing quiz
  const handleUpdateQuiz = async () => {
    setLoading(true);
    try {
      // Ensure we're using the correct field names that match the DTO
      const quizData = {
        title: formData.title,
        description: formData.description,
        isActive: formData.isActive,
        existingQuestionIds: formData.existingQuestionIds,
        removeQuestionIds: formData.removeQuestionIds || [],
        newQuestions: formData.newQuestions,
        advices: formData.advices,
      };
      
      await quizService.updateQuiz(currentQuiz.quizId, quizData);
      
      setNotification({
        open: true,
        message: "Quiz updated successfully!",
        severity: "success",
      });
      
      handleCloseDialogs();
      fetchQuizzes(); // Refresh the quiz list
    } catch (err) {
      setError("Failed to update quiz. Please try again.");
      console.error("Error updating quiz:", err);
      
      setNotification({
        open: true,
        message: "Failed to update quiz. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  // Content for each step in the multi-step form
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Quiz Title"
              type="text"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="description"
              label="Quiz Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  color="primary"
                />
              }
              label="Active"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>
            
            {/* Existing Questions */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Select Existing Questions
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="existing-questions-label">Existing Questions</InputLabel>
                <Select
                  labelId="existing-questions-label"
                  id="existing-questions"
                  multiple
                  value={formData.existingQuestionIds}
                  onChange={handleExistingQuestionChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const question = existingQuestions.find(q => q.questionId === value);
                        return (
                          <Chip 
                            key={value} 
                            label={question ? question.questionText : value} 
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {existingQuestions.map((question) => (
                    <MenuItem key={question.questionId} value={question.questionId}>
                      {question.questionText}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            {/* Add New Questions */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add New Questions
              </Typography>
              <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Question Text"
                    name="questionText"
                    value={newQuestion.questionText}
                    onChange={handleQuestionChange}
                    margin="normal"
                    required
                  />
                  
                  <FormControl component="fieldset" sx={{ my: 2 }}>
                    <FormLabel component="legend">For Gender</FormLabel>
                    <RadioGroup
                      row
                      name="forGender"
                      value={newQuestion.forGender}
                      onChange={handleQuestionChange}
                    >
                      <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                      <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                      <FormControlLabel value="BOTH" control={<Radio />} label="Both" />
                    </RadioGroup>
                  </FormControl>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Options:
                  </Typography>
                  
                  {newQuestion.options.map((option, idx) => (
                    <Box key={idx} sx={{ display: 'flex', mb: 1, gap: 1 }}>
                      <TextField
                        label="Option Text"
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(idx, 'optionText', e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <TextField
                        label="Points"
                        type="number"
                        value={option.point}
                        onChange={(e) => handleOptionChange(idx, 'point', e.target.value)}
                        sx={{ width: '100px' }}
                        size="small"
                      />
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveOption(idx)}
                        disabled={newQuestion.options.length <= 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  
                  <Button 
                    variant="outlined" 
                    onClick={handleAddOption} 
                    startIcon={<AddIcon />}
                    sx={{ mt: 1 }}
                  >
                    Add Option
                  </Button>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.questionText || newQuestion.options.some(o => !o.optionText)}
                    >
                      Add Question
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              
              {/* List of Added Questions */}
              {formData.newQuestions.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    New Questions Added:
                  </Typography>
                  <List>
                    {formData.newQuestions.map((q, idx) => (
                      <ListItem key={idx} divider>
                        <ListItemText
                          primary={q.questionText}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2">
                                For: {q.forGender}, Options: {q.options.length}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleRemoveQuestion(idx)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Score-Based Advice
            </Typography>
            <Typography variant="body2" gutterBottom>
              Add advice based on score ranges that participants will receive after taking the quiz.
            </Typography>
            
            {/* Add New Advice */}
            <Card variant="outlined" sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Advice Text"
                  name="adviceText"
                  value={newAdvice.adviceText}
                  onChange={handleAdviceChange}
                  margin="normal"
                  required
                  multiline
                  rows={3}
                />
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="From Score"
                      type="number"
                      name="fromPoint"
                      value={newAdvice.fromPoint}
                      onChange={handleAdviceChange}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="To Score"
                      type="number"
                      name="toPoint"
                      value={newAdvice.toPoint}
                      onChange={handleAdviceChange}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="contained" 
                    onClick={handleAddAdvice}
                    disabled={!newAdvice.adviceText || newAdvice.fromPoint > newAdvice.toPoint}
                  >
                    Add Advice
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* List of Added Advice */}
            {formData.advices.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Advice Added:
                </Typography>
                <List>
                  {formData.advices.map((advice, idx) => (
                    <ListItem key={idx} divider>
                      <ListItemText
                        primary={advice.adviceText}
                        secondary={`Score Range: ${advice.fromPoint} - ${advice.toPoint}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveAdvice(idx)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
              Please review your quiz details before submission.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Basic Information
                </Typography>
                <Box sx={{ ml: 2, mb: 3 }}>
                  <Typography><strong>Title:</strong> {formData.title}</Typography>
                  <Typography><strong>Description:</strong> {formData.description}</Typography>
                  <Typography><strong>Status:</strong> {formData.isActive ? "Active" : "Inactive"}</Typography>
                </Box>
                
                <Typography variant="subtitle1" gutterBottom>
                  Questions
                </Typography>
                <Box sx={{ ml: 2, mb: 3 }}>
                  <Typography><strong>Existing Questions:</strong> {formData.existingQuestionIds.length}</Typography>
                  <Typography><strong>New Questions:</strong> {formData.newQuestions.length}</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Advice
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography><strong>Total Advice:</strong> {formData.advices.length}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ marginLeft: "250px", padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Quizzes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create New Quiz
        </Button>
      </Box>

      {/* Error display */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Quizzes Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <TableRow key={quiz.quizId}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.description}</TableCell>
                  <TableCell>
                    {quiz.active ? (
                      <Chip label="Active" color="success" size="small" />
                    ) : (
                      <Chip label="Inactive" color="default" size="small" />
                    )}
                  </TableCell>
                  <TableCell>{quiz.quizQuestions?.length || 0}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Quiz">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleOpenEditDialog(quiz)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? "Loading quizzes..." : "No quizzes found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Quiz Dialog - Multi-step form */}
      <Dialog 
        open={openCreateDialog} 
        onClose={handleCloseDialogs} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Create New Quiz</DialogTitle>
        <DialogContent>
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < 3 ? (
            <Button 
              onClick={handleNext} 
              variant="contained"
              disabled={
                (activeStep === 0 && (!formData.title || !formData.description)) ||
                (activeStep === 1 && formData.existingQuestionIds.length === 0 && formData.newQuestions.length === 0) ||
                (activeStep === 2 && formData.advices.length === 0)
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleCreateQuiz} 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Create Quiz"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Quiz Dialog - Similar structure to Create */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleCloseDialogs} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Edit Quiz</DialogTitle>
        <DialogContent>
          {getStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < 3 ? (
            <Button 
              onClick={handleNext} 
              variant="contained"
              disabled={
                (activeStep === 0 && (!formData.title || !formData.description)) ||
                (activeStep === 1 && formData.existingQuestionIds.length === 0 && formData.newQuestions.length === 0) ||
                (activeStep === 2 && formData.advices.length === 0)
              }
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleUpdateQuiz} 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Update Quiz"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TherapistQuiz;