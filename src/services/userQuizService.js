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
            return await apiService.get(`${USER_QUIZ_API_PATH}/${id}`);
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
