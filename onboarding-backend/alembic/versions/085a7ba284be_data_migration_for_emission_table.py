"""data migration for energy table

Revision ID: 085a7ba284be
Revises: 1df78090c92f
Create Date: 2023-08-02 18:48:16.904278

"""
from alembic import op
import sqlalchemy as sa
import pandas as pd


# revision identifiers, used by Alembic.
revision = '085a7ba284be'
down_revision = '1df78090c92f'
branch_labels = None
depends_on = None


def upgrade() -> None:
    df = pd.read_csv('data/summary-residential-community-data.csv', delimiter=';')
    df.rename({
        'postcode': 'postcode',
        'year': 'year',
        'emission_source': 'energy_type',
        'total_electricity_kwh': 'kwh_total',
        'total_gas_gj': 'gj_total',
        'total_cost': 'total_cost',
        'total_emissions_kg_co2e': 'total_emissions',
        'average_emissions_per_customer_kg_co2e':'avg_emissions',
    }, axis=1, inplace=True)

    df = df[~(df.kwh_total.isnull() & df.gj_total.isnull())]

    df['num_customers'] = (df.total_cost / df.average_intensity_household_per_annum).round(0).astype(int)
    df = df[['postcode', 'year', 'energy_type', 'kwh_total', 'gj_total', 'total_cost', 'total_emissions', 'avg_emissions', 'num_customers']].drop_duplicates()

    data = df.to_dict(orient='records')

    op.bulk_insert(
        sa.table("energy",
            sa.Column("postcode", sa.Integer, primary_key=True, nullable=False),
            sa.Column("year", sa.Integer, primary_key=True, nullable=False),
            sa.Column("energy_type", sa.String, primary_key=True, nullable=False),
            sa.Column("kwh_total", sa.Float, nullable=True),
            sa.Column("gj_total", sa.Float, nullable=True),
            sa.Column("total_cost", sa.Float, nullable=False),
            sa.Column("total_emissions", sa.Float, nullable=False),
            sa.Column("avg_emissions", sa.Float, nullable=False),
            sa.Column("num_customers", sa.Integer, nullable=False)
        ),
        data
    )


def downgrade() -> None:
    op.execute("DELETE FROM energy")
