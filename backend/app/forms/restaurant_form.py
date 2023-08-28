from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, TextAreaField, FileField
from wtforms.validators import DataRequired, Length, FileRequired, FileAllowed
from enum import Enum
from app.api import ALLOWED_EXTENSIONS

restaurant_types=[
    "deals",
    "grocery",
    "convenience",
    "fastFood",
    "alcohol",
    "pharmacy",
    "baby",
    "specialtyFoods",
    "petSupplies",
    "flowers",
    "retail",
    "electronics"
]


class RestaurantForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    address = StringField('Address', validators=[DataRequired(), Length(max=255)])
    category = SelectField('Category',choices=restaurant_types, validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])

    submit = SubmitField('Submit')
