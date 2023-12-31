const bmiCtxKey = '__bmiCtx__';

const BMI_GET_DETAIL = `${bmiCtxKey}/BMI_GET_DETAIL`;
const BMI_GET_DETAIL_SUCCESS = `${bmiCtxKey}/BMI_GET_DETAIL_SUCCESS`;
const BMI_GET_DETAIL_FAILURE = `${bmiCtxKey}/BMI_GET_DETAIL_FAILURE`;
const BMI_DETAIL_CLEAR = `${bmiCtxKey}/BMI_DETAIL_CLEAR`;
const BMI_UPDATE_SUCCESS = `${bmiCtxKey}/BMI_UPDATE_SUCCESS`;

const BMI_GET_RECIPE_LIST = `${bmiCtxKey}/BMI_GET_RECIPE_LIST`;
const BMI_GET_RECIPE_LIST_SUCCESS = `${bmiCtxKey}/BMI_GET_RECIPE_LIST_SUCCESS`;
const BMI_GET_RECIPE_LIST_FAILURE = `${bmiCtxKey}/BMI_GET_RECIPE_LIST_FAILURE`;
const BMI_CLEAR_RECIPE_LIST = `${bmiCtxKey}/BMI_CLEAR_RECIPE_LIST`;
const BMI_INSERT_RECIPE_TO_LIST = `${bmiCtxKey}/BMI_INSERT_RECIPE_TO_LIST`;
const BMI_REMOVE_RECIPE_FROM_LIST = `${bmiCtxKey}/BMI_REMOVE_RECIPE_FROM_LIST`;

const BMI_GET_MAIN_INGREDIENTS = `${bmiCtxKey}/BMI_GET_MAIN_INGREDIENTS`;
const BMI_GET_MAIN_INGREDIENTS_SUCCESS = `${bmiCtxKey}/BMI_GET_MAIN_INGREDIENTS_SUCCESS`;
const BMI_GET_MAIN_INGREDIENTS_FAILURE = `${bmiCtxKey}/BMI_GET_MAIN_INGREDIENTS_FAILURE`;

export {
    BMI_GET_DETAIL,
    BMI_GET_DETAIL_FAILURE,
    BMI_GET_DETAIL_SUCCESS,
    BMI_DETAIL_CLEAR,
    BMI_GET_RECIPE_LIST,
    BMI_GET_RECIPE_LIST_SUCCESS,
    BMI_GET_RECIPE_LIST_FAILURE,
    BMI_CLEAR_RECIPE_LIST,
    BMI_GET_MAIN_INGREDIENTS,
    BMI_GET_MAIN_INGREDIENTS_SUCCESS,
    BMI_GET_MAIN_INGREDIENTS_FAILURE,
    BMI_UPDATE_SUCCESS,
    BMI_INSERT_RECIPE_TO_LIST,
    BMI_REMOVE_RECIPE_FROM_LIST,
};
