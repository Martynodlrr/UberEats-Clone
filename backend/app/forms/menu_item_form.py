from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, URL


class MenuItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=60)])
    price = FloatField('Price', validators=[DataRequired()])
    image = StringField('Image_Url', validators=[DataRequired(), URL(), Length(max=255)])
    calories = IntegerField('Calories', validators=[DataRequired()])

    submit = SubmitField('Submit')
