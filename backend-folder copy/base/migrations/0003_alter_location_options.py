# Generated by Django 4.2.20 on 2025-04-10 21:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_alter_location_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="location",
            options={"managed": False},
        ),
    ]
