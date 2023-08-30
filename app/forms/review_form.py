from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    body = TextAreaField('Body', validators=[DataRequired(), Length(max=255)])
    rating = IntegerField('Rating', validators=[DataRequired()])

    submit = SubmitField('Submit')
