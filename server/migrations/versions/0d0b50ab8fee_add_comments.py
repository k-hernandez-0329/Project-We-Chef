"""add comments

Revision ID: 0d0b50ab8fee
Revises: d3e15b8a869e
Create Date: 2024-01-25 10:21:00.593214

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d0b50ab8fee'
down_revision = 'd3e15b8a869e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.Text(), nullable=True),
    sa.Column('portfolio_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['portfolio_id'], ['portfolios.id'], name=op.f('fk_comments_portfolio_id_portfolios')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('engagements', schema=None) as batch_op:
        batch_op.drop_column('likes')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('engagements', schema=None) as batch_op:
        batch_op.add_column(sa.Column('likes', sa.INTEGER(), nullable=True))

    op.drop_table('comments')
    # ### end Alembic commands ###