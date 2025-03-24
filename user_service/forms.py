from django import forms

class TableForm(forms.Form):
    table = forms.CharField(label="View table", max_length=100)

