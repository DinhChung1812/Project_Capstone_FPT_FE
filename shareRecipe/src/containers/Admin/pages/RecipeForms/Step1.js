import { LoadingOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/Input/Input';
import { RECIPE_LEVELS } from '../../../../constants';
import RecipeContext, { initialRecipeFormData } from '../../../../context/recipe-context';
import { RecipeStep1Schema } from '../../../../validators';

const Step1 = ({ recipeFormData, setRecipeFormData, id, isLoading, initialValues, isMod }) => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [idDishCategory, setIdDishCategory] = useState([]);
    const [listCateError, setListCateError] = useState('');
    const [domain, setDomain] = useState('');

    useEffect(() => {
        if (recipeFormData?.idDishCategory) {
            setIdDishCategory(recipeFormData.idDishCategory);
        }
    }, [recipeFormData]);

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCheckRecipeCategory = (e) => {
        setListCateError('');
        const value = parseInt(e.target.value);
        if (idDishCategory.find((item) => item.dishCategoryID === value)) {
            setIdDishCategory((prevState) => prevState.filter((item) => item.dishCategoryID !== value));
        } else {
            setIdDishCategory((prevState) => [...prevState, { dishCategoryID: value }]);
        }
    };

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setDomain(event.target.value);
    };

    const onSubmit = (values) => {
        console.log(values)
        if (idDishCategory.length === 0) {
            setListCateError('Vui lòng chọn ít nhất 1 thể loại món ăn');
            return;
        }
        setRecipeFormData({
            ...recipeFormData,
            ...values,
            idDishCategory,
        });
        navigate(`${isMod ? '' : '/admin'}/recipe-form?step=2${id ? `&id=${id}` : ''}`);
    };

    if (isLoading) {
        return (
            <div className="global-list__loader-container">
                <LoadingOutlined className="global-list__loader-icon" />
            </div>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={RecipeStep1Schema}
            enableReinitialize={true}
        >
            {({ errors, touched, values, handleChange }) => (
                console.log(values),
                <Form>
                    <Input
                        name="name"
                        onChange={handleChange}
                        placeholder="Vui lòng nhập tên món ăn"
                        value={values.name}
                        label="Nhập tên món ăn :"
                        error={errors.name}
                        touched={touched.name}
                    />
                    <Input
                        type="textarea"
                        name="description"
                        onChange={handleChange}
                        placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                        value={values.description}
                        error={errors.description}
                        touched={touched.description}
                        label="Mô tả công thức :"
                    />
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 500 }}>
                            Món ăn thuộc vùng miền
                        </div>
                        <div style={{ display: 'flex', marginTop: '1rem' }} >

                            <input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Bắc"}
                                error={errors.domain}
                                touched={touched.domain}
                                checked={values.domain === 'Miền Bắc'}
                                style={{ marginRight: '1rem'}}
                            />
                            <label style={{ marginRight: '2rem' }}>Miền Bắc</label>
                            <input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Trung"}
                                error={errors.domain}
                                touched={touched.domain}
                                checked={values.domain === 'Miền Trung'}
                                style={{ marginRight: '1rem'}}
                            />
                            <label style={{ marginRight: '2rem' }}>Miền Trung</label>
                            <input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Nam"}
                                error={errors.domain}
                                touched={touched.domain}
                                checked={values.domain === 'Miền Nam'}
                                style={{ marginRight: '1rem' }}
                            />
                            <label style={{ marginRight: '2rem' }}>Miền Nam</label>
                            {/* <Input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Bắc"}
                                error={errors.domain}
                                touched={touched.domain}
                            />
                            <label style={{ marginTop: -6, marginRight: '1rem' }}>Miền Bắc</label>
                            <Input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Trung"}
                                error={errors.domain}
                                touched={touched.domain}
                                checked={values.domain === 'Miền Trung'}
                            />
                            <label style={{ marginTop: -6, marginRight: '1rem' }}>Miền Trung</label>
                            <Input
                                type="radio"
                                name="domain"
                                onChange={handleChange}
                                placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                                value={"Miền Nam"}
                                error={errors.domain}
                                touched={touched.domain}
                                checked={values.domain === 'Miền Nam'}
                            />
                            <label style={{ marginTop: -6, marginRight: '1rem' }}>Miền Nam</label> */}
                        </div>
                    </div>
                    <div className="recipe-category__container">
                        <h5 className="recipe-field__label">Thể loại món ăn</h5>
                        <div className="recipe-category__list">
                            {categories.list.map(({ dishCategoryID, name }, index) => (
                                <label key={`${dishCategoryID}-${index}`} className="checkboxContainer">
                                    {name}
                                    <input
                                        type="checkbox"
                                        value={dishCategoryID}
                                        onChange={onCheckRecipeCategory}
                                        checked={idDishCategory.find((item) => item.dishCategoryID === dishCategoryID)}
                                    />
                                    <span className="checkmarkCheckbox" />
                                </label>
                            ))}
                        </div>
                        {listCateError && <p className="error-message">{listCateError}</p>}
                    </div>
                    <div className="recipe-level__container">
                        <h5 className="recipe-field__label">Độ khó của món ăn :</h5>
                        <div className="recipe-level__list">
                            {RECIPE_LEVELS.map(({ value, label }) => (
                                <label key={value} className="custom-radio__container">
                                    {label}
                                    <input
                                        type="radio"
                                        name="level"
                                        onChange={handleChange}
                                        value={value}
                                        checked={value === values.level}
                                    />
                                    <span className="radioCheckmark" />
                                </label>
                            ))}
                        </div>
                        {errors.level && touched.level && <p className="error-message">{errors.level}</p>}
                    </div>
                    <div className="mt-3 d-flex gap-5">
                        <Input
                            name="time"
                            type="number"
                            onChange={handleChange}
                            value={values.time}
                            label="Thời gian nấu :"
                            error={errors.time}
                            touched={touched.time}
                            className="w-50"
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-4 align-items-center mt-4">
                        <button
                            className="button button-sm button-secondary"
                            type="button"
                            onClick={() => {
                                setRecipeFormData(initialRecipeFormData);
                                setIdDishCategory([]);
                                navigate(isMod ? '/my-recipes' : '/admin/recipes');
                            }}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            className="button button-sm button-green"
                            type="submit"
                            onClick={() => {
                                if (idDishCategory.length === 0) {
                                    setListCateError('Vui lòng chọn ít nhất 1 thể loại món ăn');
                                }
                            }}
                        >
                            Tiếp theo
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Step1;
