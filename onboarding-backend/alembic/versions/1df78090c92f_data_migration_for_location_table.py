"""data migration for location table

Revision ID: 1df78090c92f
Revises: b08808b4582b
Create Date: 2023-08-02 18:46:27.919640

"""
from alembic import op
import sqlalchemy as sa
import pandas as pd


# revision identifiers, used by Alembic.
revision = '1df78090c92f'
down_revision = 'b08808b4582b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    df = pd.read_csv('data/summary-residential-community-data.csv', delimiter=';')
    df[['latitude', 'longitude']] = df.geo_point_2d.str.split(',', expand=True)
    df = df[['postcode', 'suburb', 'latitude', 'longitude']].drop_duplicates()

    data = df.to_dict(orient='records')
    op.bulk_insert(
        sa.table("locations",
            sa.Column("postcode", sa.Integer, primary_key=True, nullable=False),
            sa.Column("suburb", sa.String, nullable=False),
            sa.Column("latitude", sa.Float, nullable=False),
            sa.Column("longitude", sa.Float, nullable=False)
        ),
        data
        )


def downgrade() -> None:
    op.execute("DELETE FROM locations")
