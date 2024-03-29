"""
WSGI config for explorer project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from dotenv import load_dotenv

from pathlib import Path

ENV_PATH = Path('../../') / '.env.development'
# load_dotenv(dotenv_path=ENV_PATH)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'explorer.settings')

application = get_wsgi_application()
