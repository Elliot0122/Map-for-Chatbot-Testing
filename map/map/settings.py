import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# ... other settings ...

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Add these settings
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Add staticfiles to your INSTALLED_APPS if not already there
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  # Make sure this is here
    'maps_app',
    # ... other apps ...
]

# ... rest of your settings ... 