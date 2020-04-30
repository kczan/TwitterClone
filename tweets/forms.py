from django import forms
from django.conf import settings
from .models import Tweet 



class TweetForm(forms.ModelForm):

  class Meta:
    model = Tweet
    fields = ['content']

  def clean_content(self):
    content = self.cleaned_data.get('content')
    if len(content) > settings.MAX_TWEET_LENGTH:
      raise forms.ValidationError('Maximum of 180 characters in one tweet.')

    return content