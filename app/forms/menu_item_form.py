from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileRequired, FileField, FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS

class MenuItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=60)])
    price = FloatField('Price', validators=[DataRequired()])
    # image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    image =StringField("Image",validators=[DataRequired()])
    calories = IntegerField('Calories', validators=[DataRequired()])

    submit = SubmitField('Submit')
