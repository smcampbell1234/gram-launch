import gramApi from "../api/gramApi";

const getGrams = () => {
  return async function (dispatch, getState) {
    const response = await gramApi.get("/grams-all");
    dispatch({
      type: "GET_GRAMS",
      payload: response.data.body
    })
  }
}

const deleteGram = (id) => {
  return async function (dispatch, getState) {
    const response = await gramApi.delete('',{
      data: {
        "gramId":id
      }
    });
    dispatch({
      type: "DELETE_GRAMS",
      payload: response
    })
  }
}

// REWRITE
// const getGrams = () => async (dispatch, getState) => {
//   const response = await gramApi.get("/grams-all");
//   dispatch({
//     type: "GET_GRAMS",
//     payload: response.data
//   })
// }

const addGram = (gramObj) => {
  return async function (dispatch, getState) {
    await gramApi.post('', {
      data: gramObj
    }).then((response) => {
      dispatch({
        type: "ADD_GRAM",
        payload: response
      });
    }).catch((error) => {
      dispatch({
        type: "ADD_GRAM_FAILED"
      });
    })
    // dispatch({
    //   type: "ADD_GRAM",
    //   payload: response
    // })
  }
}

export {
  getGrams,
  deleteGram,
  addGram
}
