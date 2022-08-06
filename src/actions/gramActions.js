import gramApi from "../api/gramApi";

// CRUD operations to interact with gram-table

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
  }
}

const adjustGram = (gramObj) => {
  return async function (dispatch, getState) {
    await gramApi.put('',{
      data: gramObj
    }).then((response) => {
        dispatch({
          type: "ADJUST_GRAM",
          payload: response
        })
      }).catch((error) => {
          dispatch({
            type: "ADJUST_GRAM_FAIL",
            payload: error
          })
      })
  }
}

export {
  getGrams,
  deleteGram,
  addGram,
  adjustGram
}
