"""create emission table

Revision ID: b08808b4582b
Revises: 148046517434
Create Date: 2023-08-02 18:45:27.800926

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b08808b4582b'
down_revision = '148046517434'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "energy",
        sa.Column("postcode", sa.Integer, primary_key=True, nullable=False),
        sa.Column("year", sa.Integer, primary_key=True, nullable=False),
        sa.Column("energy_type", sa.String, primary_key=True, nullable=False),
        sa.Column("kwh_total", sa.Float, nullable=True),
        sa.Column("gj_total", sa.Float, nullable=True),
        sa.Column("total_cost", sa.Float, nullable=False),
        sa.Column("total_emissions", sa.Float, nullable=False),
        sa.Column("avg_emissions", sa.Float, nullable=False),
        sa.Column("num_customers", sa.Integer, nullable=False)
    )



def downgrade() -> None:
    op.drop_table("energy")
