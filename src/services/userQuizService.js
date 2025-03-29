import apiService from './apiService';

const USER_QUIZ_API_PATH = '/quiz-svc/v1';

const userQuizService = {

    async getAvailableQuizzes() {
        try {
            return await apiService.get(`${USER_QUIZ_API_PATH}/list`);
        } catch (error) {
            console.error('Error fetching available quizzes:', error);
            throw error;
        }
    },


    async getQuizWithQuestions(id) {
        try {
            if (!id || id === 'undefined') {
                throw new Error(`Invalid quiz ID: ${id}`);
            }
            console.log(`Fetching quiz with ID: ${id}`);
            const response = await apiService.get(`${USER_QUIZ_API_PATH}/${id}`);

            if (response.questions && Array.isArray(response.questions)) {
                response.quizQuestions = response.questions.map(question => ({
                    question: {
                        questionId: question.id,
                        questionText: question.questionText,
                        forGender: question.forGender,
                        questionOption: question.options.map(option => ({
                            optionId: option.id,
                            optionText: option.optionText,
                            point: option.point
                        }))
                    }
                }));
            }

            return response;
        } catch (error) {
            console.error(`Error fetching quiz with id ${id}:`, error);
            throw error;
        }
    },


    async submitQuizAnswers(submission) {
        try {
            return await apiService.post(`${USER_QUIZ_API_PATH}/submit`, submission);
        } catch (error) {
            console.error('Error submitting quiz answers:', error);
            throw error;
        }
    },


    async getQuizHistory() {
        try {
            return await apiService.get(`${USER_QUIZ_API_PATH}/histories`);
        } catch (error) {
            console.error('Error fetching quiz history:', error);
            throw error;
        }
    }
};

export default userQuizService;
