from django.core.management.base import BaseCommand
from pycountry import countries


class Command(BaseCommand):

    def handle(self, *args, **options) -> None:
        country = countries.get(name="United States")
        print(country, "country")
