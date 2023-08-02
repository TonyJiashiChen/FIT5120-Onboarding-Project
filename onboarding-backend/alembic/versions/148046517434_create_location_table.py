"""create location table

Revision ID: 148046517434
Revises: 
Create Date: 2023-08-02 18:32:03.770826

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '148046517434'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "locations",
        sa.Column("postcode", sa.Integer, primary_key=True, nullable=False),
        sa.Column("suburb", sa.String, nullable=False),
        sa.Column("latitude", sa.Float, nullable=False),
        sa.Column("longitude", sa.Float, nullable=False)
    )


def downgrade() -> None:
    op.drop_table("locations")
