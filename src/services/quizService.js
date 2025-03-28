import apiService from './apiService';

const QUIZ_API_PATH = '/quiz-configurator/v1';


const quizService = {

    async getMyQuizzes() {
        try {
            return await apiService.get(`${QUIZ_API_PATH}/my-quizzes`);
        } catch (error) {
            console.error('Error fetching my quizzes:', error);
            throw error;
        }
    },


    async getAllQuizzes() {
        try {
            return await apiService.get(`${QUIZ_API_PATH}/all-quizzes`);
        } catch (error) {
            console.error('Error fetching all quizzes:', error);
            throw error;
        }
    },


    async getQuizById(id) {
        try {
            return await apiService.get(`${QUIZ_API_PATH}/${id}`);
        } catch (error) {
            console.error(`Error fetching quiz with id ${id}:`, error);
            throw error;
        }
    },


    async createQuiz(quizData) {
        try {
            return await apiService.post(`${QUIZ_API_PATH}/create`, quizData);
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error;
        }
    },


    async updateQuiz(id, quizData) {
        try {
            return await apiService.put(`${QUIZ_API_PATH}/${id}`, quizData);
        } catch (error) {
            console.error(`Error updating quiz with id ${id}:`, error);
            throw error;
        }
    }
};

export default quizService;
