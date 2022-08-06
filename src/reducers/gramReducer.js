import lodash from 'lodash'

export default (currentGramState = [], action) => {
  switch (action.type) {
    case "GET_GRAMS":
        return action.payload;
    case "ADD_GRAM":
      return currentGramState;
    case "ADD_GRAM_FAIL":
      return currentGramState;
    case "DELETE_GRAMS":
      return action.payload;
    case "UPDATE_GRAMS":
    default:
      return currentGramState;
  }
}