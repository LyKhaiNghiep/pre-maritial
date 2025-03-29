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
  IconButton,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Chip,
  IconButton as MuiIconButton,
} from "@mui/material";
import { Add, Edit, Delete, Visibility, VisibilityOff, AddCircle, RemoveCircle } from "@mui/icons-material";
import { toast } from "react-toastify";

// This component displays and manages the therapist's quizzes.
// Replace mock data with API calls (e.g., fetchTherapistQuizzes) when ready.
const TherapistQuiz = () => {
  const navigate = useNavigate();

  // Mock data for quizzes, following the provided schema
  const mockQuizzes = [
    {
      id: 1,
      title: "Mental Health Check-In for Men",
      description: "A short quiz to assess your mental well-being.",
      isActive: true,
      existingQuestionIds: [1, 2],
      removeQuestionIds: [],
      newQuestions: [
        {
          id: 1,
          questionText: "How often do you feel overwhelmed by stress?",
          forGender: "MALE",
          options: [
            { id: 1, optionText: "Rarely", point: 0 },
            { id: 2, optionText: "Sometimes", point: 1 },
            { id: 3, optionText: "Often", point: 2 },
          ],
        },
        {
          id: 2,
          questionText: "Do you find it difficult to express your emotions?",
          forGender: "MALE",
          options: [
            { id: 4, optionText: "Not at all", point: 0 },
            { id: 5, optionText: "Somewhat", point: 1 },
            { id: 6, optionText: "Very much", point: 2 },
          ],
        },
      ],
      advices: [
        { id: 1, adviceText: "You seem to be managing well. Keep up your self-care routine.", fromPoint: 0, toPoint: 1 },
        { id: 2, adviceText: "You may be experiencing some stress. Consider speaking with a therapist.", fromPoint: 2, toPoint: 4 },
      ],
    },
    {
      id: 2,
      title: "Emotional Well-Being for Women",
      description: "A quiz to help you reflect on your emotional health.",
      isActive: false,
      existingQuestionIds: [3, 4],
      removeQuestionIds: [],
      newQuestions: [
        {
          id: 3,
          questionText: "How often do you feel supported by your loved ones?",
          forGender: "FEMALE",
          options: [
            { id: 7, optionText: "Always", point: 0 },
            { id: 8, optionText: "Sometimes", point: 1 },
            { id: 9, optionText: "Rarely", point: 2 },
          ],
        },
        {
          id: 4,
          questionText: "Do you experience frequent mood swings?",
          forGender: "FEMALE",
          options: [
            { id: 10, optionText: "Not at all", point: 0 },
            { id: 11, optionText: "Occasionally", point: 1 },
            { id: 12, optionText: "Frequently", point: 2 },
          ],
        },
      ],
      advices: [
        { id: 3, adviceText: "You’re doing great! Continue nurturing your support system.", fromPoint: 0, toPoint: 1 },
        { id: 4, adviceText: "You might benefit from discussing your feelings with a professional.", fromPoint: 2, toPoint: 4 },
      ],
    },
  ];

  const [quizzes, setQuizzes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({
    id: null,
    title: "",
    description: "",
    isActive: true,
    existingQuestionIds: [],
    removeQuestionIds: [],
    newQuestions: [
      {
        id: 0,
        questionText: "",
        forGender: "MALE",
        options: [
          { id: 0, optionText: "", point: 0 },
          { id: 1, optionText: "", point: 1 },
        ],
      },
    ],
    advices: [
      { id: 0, adviceText: "", fromPoint: 0, toPoint: 0 },
    ],
  });

  useEffect(() => {
    // Simulate fetching quizzes
    // TODO: Replace with real API call, e.g.:
    // const fetchQuizzes = async () => {
    //   const therapistId = getLoggedInTherapistId();
    //   await fetchTherapistQuizzes(therapistId);
    //   setQuizzes(therapistQuizzesFromContext);
    // };
    setQuizzes(mockQuizzes);
  }, []);

  const handleOpenModal = (quiz = null) => {
    if (quiz) {
      setIsEditing(true);
      setCurrentQuiz({ ...quiz, newQuestions: quiz.newQuestions || [] });
    } else {
      setIsEditing(false);
      setCurrentQuiz({
        id: null,
        title: "",
        description: "",
        isActive: true,
        existingQuestionIds: [],
        removeQuestionIds: [],
        newQuestions: [
          {
            id: 0,
            questionText: "",
            forGender: "MALE",
            options: [
              { id: 0, optionText: "", point: 0 },
              { id: 1, optionText: "", point: 1 },
            ],
          },
        ],
        advices: [
          { id: 0, adviceText: "", fromPoint: 0, toPoint: 0 },
        ],
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentQuiz({
      id: null,
      title: "",
      description: "",
      isActive: true,
      existingQuestionIds: [],
      removeQuestionIds: [],
      newQuestions: [
        {
          id: 0,
          questionText: "",
          forGender: "MALE",
          options: [
            { id: 0, optionText: "", point: 0 },
            { id: 1, optionText: "", point: 1 },
          ],
        },
      ],
      advices: [
        { id: 0, adviceText: "", fromPoint: 0, toPoint: 0 },
      ],
    });
  };

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setCurrentQuiz((prev) => {
      const newQuestions = [...prev.newQuestions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      return { ...prev, newQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setCurrentQuiz((prev) => {
      const newQuestions = [...prev.newQuestions];
      const options = [...newQuestions[questionIndex].options];
      options[optionIndex] = { ...options[optionIndex], [field]: value };
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options };
      return { ...prev, newQuestions };
    });
  };

  const handleAdviceChange = (index, field, value) => {
    setCurrentQuiz((prev) => {
      const advices = [...prev.advices];
      advices[index] = { ...advices[index], [field]: value };
      return { ...prev, advices };
    });
  };

  const addQuestion = () => {
    setCurrentQuiz((prev) => ({
      ...prev,
      newQuestions: [
        ...prev.newQuestions,
        {
          id: prev.newQuestions.length,
          questionText: "",
          forGender: "MALE",
          options: [
            { id: 0, optionText: "", point: 0 },
            { id: 1, optionText: "", point: 1 },
          ],
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setCurrentQuiz((prev) => {
      const newQuestions = [...prev.newQuestions];
      const removedQuestion = newQuestions.splice(index, 1)[0];
      return {
        ...prev,
        newQuestions,
        removeQuestionIds: removedQuestion.id ? [...prev.removeQuestionIds, removedQuestion.id] : prev.removeQuestionIds,
      };
    });
  };

  const addOption = (questionIndex) => {
    setCurrentQuiz((prev) => {
      const newQuestions = [...prev.newQuestions];
      const options = [...newQuestions[questionIndex].options];
      options.push({ id: options.length, optionText: "", point: options.length });
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options };
      return { ...prev, newQuestions };
    });
  };

  const removeOption = (questionIndex, optionIndex) => {
    setCurrentQuiz((prev) => {
      const newQuestions = [...prev.newQuestions];
      const options = [...newQuestions[questionIndex].options];
      options.splice(optionIndex, 1);
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options };
      return { ...prev, newQuestions };
    });
  };

  const addAdvice = () => {
    setCurrentQuiz((prev) => ({
      ...prev,
      advices: [
        ...prev.advices,
        { id: prev.advices.length, adviceText: "", fromPoint: 0, toPoint: 0 },
      ],
    }));
  };

  const removeAdvice = (index) => {
    setCurrentQuiz((prev) => {
      const advices = [...prev.advices];
      advices.splice(index, 1);
      return { ...prev, advices };
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!currentQuiz.title || !currentQuiz.description) {
      toast.error("Please fill in the quiz title and description.");
      return;
    }
    if (currentQuiz.newQuestions.length === 0 || currentQuiz.newQuestions.some(q => !q.questionText || q.options.some(o => !o.optionText))) {
      toast.error("Please fill in all questions and options.");
      return;
    }
    if (currentQuiz.advices.length === 0 || currentQuiz.advices.some(a => !a.adviceText || a.fromPoint === "" || a.toPoint === "")) {
      toast.error("Please fill in all advice fields.");
      return;
    }

    if (isEditing) {
      // Update existing quiz
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz.id === currentQuiz.id ? { ...currentQuiz } : quiz
        )
      );
      toast.success("Quiz updated successfully!");
    } else {
      // Create new quiz
      const newQuiz = {
        ...currentQuiz,
        id: quizzes.length + 1,
        existingQuestionIds: currentQuiz.newQuestions.map((q, i) => i),
      };
      setQuizzes((prev) => [...prev, newQuiz]);
      toast.success("Quiz added successfully!");
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          marginLeft: "250px", // Push content to the right of the sidebar
          padding: { xs: 2, md: 4 },
          backgroundColor: "#f5f7fa",
        }}
      >
        <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#2c3e50",
              fontWeight: 700,
              letterSpacing: "1px",
              mb: 4,
            }}
          >
            My Quizzes
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, md: 3 },
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#2c3e50",
                  fontWeight: 500,
                }}
              >
                Quiz Management
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpenModal()}
                sx={{
                  backgroundColor: "#1976d2",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                Add New Quiz
              </Button>
            </Box>
            <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Target Gender
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#2c3e50", borderBottom: "2px solid #e0e0e0" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                      <TableRow key={quiz.id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {quiz.title}
                        </TableCell>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {quiz.description}
                        </TableCell>
                        <TableCell sx={{ color: "#2c3e50", borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          {quiz.newQuestions[0]?.forGender || "N/A"}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          <Chip
                            label={quiz.isActive ? "Active" : "Inactive"}
                            color={quiz.isActive ? "success" : "default"}
                            icon={quiz.isActive ? <Visibility /> : <VisibilityOff />}
                            sx={{ borderRadius: "16px" }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid #e0e0e0", py: 1.5 }}>
                          <IconButton
                            onClick={() => handleOpenModal(quiz)}
                            sx={{ color: "#1976d2", "&:hover": { color: "#1565c0" } }}
                            title="Edit Quiz"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(quiz.id)}
                            sx={{ color: "#e57373", "&:hover": { color: "#d32f2f" } }}
                            title="Delete Quiz"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: "#666", fontStyle: "italic", borderBottom: "none", py: 2 }}>
                        No quizzes found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Modal for Adding/Editing Quizzes */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 700 },
              bgcolor: "background.paper",
              borderRadius: "12px",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#2c3e50", fontWeight: 500 }}
            >
              {isEditing ? "Edit Quiz" : "Add New Quiz"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Quiz Title"
                  name="title"
                  value={currentQuiz.title}
                  onChange={handleQuizChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#666" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1976d2" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={currentQuiz.description}
                  onChange={handleQuizChange}
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={2}
                  InputLabelProps={{ style: { color: "#666" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#1976d2" },
                      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#666" }}>Status</InputLabel>
                  <Select
                    name="isActive"
                    value={currentQuiz.isActive}
                    onChange={(e) => setCurrentQuiz((prev) => ({ ...prev, isActive: e.target.value }))}
                    label="Status"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                      },
                    }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Questions Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: "#2c3e50", fontWeight: 500 }}>
                  Questions
                </Typography>
                {currentQuiz.newQuestions.map((question, qIndex) => (
                  <Box key={qIndex} sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label={`Question ${qIndex + 1}`}
                          value={question.questionText}
                          onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                          InputLabelProps={{ style: { color: "#666" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              "& fieldset": { borderColor: "#e0e0e0" },
                              "&:hover fieldset": { borderColor: "#1976d2" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel sx={{ color: "#666" }}>Target Gender</InputLabel>
                          <Select
                            value={question.forGender}
                            onChange={(e) => handleQuestionChange(qIndex, "forGender", e.target.value)}
                            label="Target Gender"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                "& fieldset": { borderColor: "#e0e0e0" },
                                "&:hover fieldset": { borderColor: "#1976d2" },
                                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                              },
                            }}
                          >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: "#2c3e50" }}>
                          Options
                        </Typography>
                        {question.options.map((option, oIndex) => (
                          <Grid container spacing={2} key={oIndex} sx={{ mb: 1 }}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label={`Option ${oIndex + 1}`}
                                value={option.optionText}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, "optionText", e.target.value)}
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps={{ style: { color: "#666" } }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "& fieldset": { borderColor: "#e0e0e0" },
                                    "&:hover fieldset": { borderColor: "#1976d2" },
                                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={8} sm={4}>
                              <TextField
                                label="Points"
                                type="number"
                                value={option.point}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, "point", parseInt(e.target.value))}
                                variant="outlined"
                                fullWidth
                                required
                                InputLabelProps={{ style: { color: "#666" } }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    "& fieldset": { borderColor: "#e0e0e0" },
                                    "&:hover fieldset": { borderColor: "#1976d2" },
                                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={4} sm={2}>
                              <MuiIconButton
                                onClick={() => removeOption(qIndex, oIndex)}
                                sx={{ color: "#e57373" }}
                                disabled={question.options.length <= 2}
                              >
                                <RemoveCircle />
                              </MuiIconButton>
                            </Grid>
                          </Grid>
                        ))}
                        <Button
                          startIcon={<AddCircle />}
                          onClick={() => addOption(qIndex)}
                          sx={{ mt: 1, color: "#1976d2", textTransform: "none" }}
                        >
                          Add Option
                        </Button>
                      </Grid>
                    </Grid>
                    <MuiIconButton
                      onClick={() => removeQuestion(qIndex)}
                      sx={{ mt: 1, color: "#e57373" }}
                      disabled={currentQuiz.newQuestions.length <= 1}
                    >
                      <RemoveCircle /> Remove Question
                    </MuiIconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddCircle />}
                  onClick={addQuestion}
                  sx={{ mt: 2, color: "#1976d2", textTransform: "none" }}
                >
                  Add Question
                </Button>
              </Grid>

              {/* Advice Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: "#2c3e50", fontWeight: 500 }}>
                  Advice Based on Score
                </Typography>
                {currentQuiz.advices.map((advice, aIndex) => (
                  <Box key={aIndex} sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label={`Advice ${aIndex + 1}`}
                          value={advice.adviceText}
                          onChange={(e) => handleAdviceChange(aIndex, "adviceText", e.target.value)}
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows={2}
                          InputLabelProps={{ style: { color: "#666" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              "& fieldset": { borderColor: "#e0e0e0" },
                              "&:hover fieldset": { borderColor: "#1976d2" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="From Score"
                          type="number"
                          value={advice.fromPoint}
                          onChange={(e) => handleAdviceChange(aIndex, "fromPoint", parseInt(e.target.value))}
                          variant="outlined"
                          fullWidth
                          required
                          InputLabelProps={{ style: { color: "#666" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              "& fieldset": { borderColor: "#e0e0e0" },
                              "&:hover fieldset": { borderColor: "#1976d2" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="To Score"
                          type="number"
                          value={advice.toPoint}
                          onChange={(e) => handleAdviceChange(aIndex, "toPoint", parseInt(e.target.value))}
                          variant="outlined"
                          fullWidth
                          required
                          InputLabelProps={{ style: { color: "#666" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              "& fieldset": { borderColor: "#e0e0e0" },
                              "&:hover fieldset": { borderColor: "#1976d2" },
                              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MuiIconButton
                      onClick={() => removeAdvice(aIndex)}
                      sx={{ mt: 1, color: "#e57373" }}
                      disabled={currentQuiz.advices.length <= 1}
                    >
                      <RemoveCircle /> Remove Advice
                    </MuiIconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddCircle />}
                  onClick={addAdvice}
                  sx={{ mt: 2, color: "#1976d2", textTransform: "none" }}
                >
                  Add Advice
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#1976d2",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                startIcon={<Delete />}
                sx={{
                  borderColor: "#e57373",
                  color: "#e57373",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { borderColor: "#d32f2f", color: "#d32f2f", transform: "scale(1.02)" },
                  transition: "all 0.3s ease",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default TherapistQuiz;