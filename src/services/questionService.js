import apiService from './apiService';

const QUESTIONS_API_PATH = '/api/questions';


const questionService = {

  async getAllQuestions() {
    try {
      return await apiService.get(QUESTIONS_API_PATH);
    } catch (error) {
      console.error('Error fetching all questions:', error);
      throw error;
    }
  },


  async getQuestionsByGender(gender) {
    try {
      return await apiService.get(`${QUESTIONS_API_PATH}?gender=${gender}`);
    } catch (error) {
      console.error(`Error fetching questions for gender ${gender}:`, error);
      throw error;
    }
  },


  async searchQuestions(searchText) {
    try {
      return await apiService.get(`${QUESTIONS_API_PATH}?search=${encodeURIComponent(searchText)}`);
    } catch (error) {
      console.error(`Error searching questions with term "${searchText}":`, error);
      throw error;
    }
  },


  async getMyQuestions() {
    try {
      return await apiService.get(`${QUESTIONS_API_PATH}/my-questions`);
    } catch (error) {
      console.error('Error fetching my questions:', error);
      throw error;
    }
  },


  async getQuestionById(id) {
    try {
      return await apiService.get(`${QUESTIONS_API_PATH}/${id}`);
    } catch (error) {
      console.error(`Error fetching question with ID ${id}:`, error);
      throw error;
    }
  }
};

export default questionService; 