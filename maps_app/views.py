from django.shortcuts import render

def map_view(request):
    return render(request, 'maps_app/index.html') 