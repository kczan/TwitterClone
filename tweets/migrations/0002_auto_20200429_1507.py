# Generated by Django 3.0.5 on 2020-04-29 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='content',
            field=models.TextField(blank=True, max_length=180, null=True),
        ),
    ]
