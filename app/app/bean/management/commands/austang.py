from django.core.management.base import BaseCommand
from pycountry import countries
from pycountry.db import Country


class Command(BaseCommand):

    def handle(self, *args, **options) -> None:
        countries
        for country in countries:
            country: Country = country
