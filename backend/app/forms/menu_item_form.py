from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, FileRequired, FileAllowed
from app.api import ALLOWED_EXTENSIONS


class MenuItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=60)])
    price = FloatField('Price', validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    calories = IntegerField('Calories', validators=[DataRequired()])

    submit = SubmitField('Submit')
