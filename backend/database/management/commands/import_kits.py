from django.core.management.base import BaseCommand
from database.models import Kits  # Adjust import based on your app name
from django.core.files import File
import os

class Command(BaseCommand):
    help = 'Imports kits into the database with specified sizes and quantities'

    def handle(self, *args, **kwargs):
        sizes = ['S', 'M', 'L', 'XL', 'XXL']
        teams = [
            {'name': 'Real Madrid', 'price': 6000, 'image_path': 'real_madrid.jpg'},
            {'name': 'Barcelona', 'price': 4000, 'image_path': 'barcelona.jpg'},
            {'name': 'Atlético Madrid', 'price': 4500, 'image_path': 'atletico.jpg'},
            {'name': 'Borussia Dortmund', 'price': 4500, 'image_path': 'dortmund.jpg'},
            {'name': 'Bayern Munich', 'price': 5500, 'image_path': 'bayern.jpg'},
            {'name': 'Paris Saint-Germain', 'price': 5000, 'image_path': 'psg.jpg'},
            {'name': 'Juventus', 'price': 5000, 'image_path': 'juventus.jpg'},
            {'name': 'Inter Milan', 'price': 4500, 'image_path': 'inter.jpg'},
            {'name': 'AC Milan', 'price': 5000, 'image_path': 'milan.jpg'},
            {'name': 'Liverpool', 'price': 5500, 'image_path': 'liverpool.jpg'},
            {'name': 'Manchester City', 'price': 6000, 'image_path': 'man_city.jpg'},
            {'name': 'Manchester United', 'price': 4000, 'image_path': 'man_united.jpg'},
        ]

        # Absolute path where images are stored
        image_dir = image_dir = 'C:\\Users\\Prasham Desai\\Desktop\\UNI\\Sem 4\\Project\\frontend\\src\\images\\kits'


        kits_to_create = []
        for team in teams:
            for size in sizes:
                image_path = os.path.join(image_dir, team['image_path'])
                if os.path.isfile(image_path):
                    with open(image_path, 'rb') as img_file:
                        image = File(img_file)
                        kits_to_create.append(
                            Kits(
                                name=team['name'],
                                size=size,
                                price=team['price'],
                                quantity=10,
                                image=image
                            )
                        )

        Kits.objects.bulk_create(kits_to_create)
        self.stdout.write(self.style.SUCCESS('Successfully imported kits'))
