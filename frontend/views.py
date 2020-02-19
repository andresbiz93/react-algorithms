from django.shortcuts import render

# Create your views here.

# Just serving the main page
def index(request):
    return render(request, 'frontend/index.html')

