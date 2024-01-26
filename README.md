# Project WeChef

---

## Welcome to WeChef

Welcome to the culinary world, where chefs are artists crafting unique
dining experiences. Unlike traditional professions, chefs face a
challenge in sharing their portfolios. Culinary creations are fleeting,
existing in taste, aroma, and texture. In a world dominated by visual
platforms like LinkedIn, showcasing the essence of a chef's talent
becomes a unique hurdle. Beyond the final dish, a chef's artistry lies
in the meticulous process, precision, and artistic choices. Join us
in celebrating the culinary industry, where passion meets precision. Without a dedicated platform, we aim to create a space for chefs
to share their stories and connect. Let's appreciate the extraordinary
talents that make the culinary world truly exceptional.



A concept network where Chefs of all ranges can show their work and connect with others in the same industry. While LinkedIn is available, the restaurant industry relies on more of a visual concept.
## User
The user would be able to 
- Join the network
- Create, edit, and delete their profile
- View other chefs on the network, and search based on culinary role.
- View and engage with other Chefs' Portfolios.
- A user can comment and like on the said portfolio.

## ERD Concept

![Screenshot 2024-01-26 at 10 15 34 AM](https://github.com/k-hernandez-0329/Project-We-Chef/assets/145728313/bc835bb3-b450-42dd-b7fd-55af0c342171)


One-to-One Relationships:

engagements with chefs
engagements with portfolios
Many-to-Many Relationship:

chefs with portfolios (through chef_portfolio_association)
One-to-Many Relationships:

chefs with engagements
portfolios with engagements
portfolios with comments


## Setup

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

Check that your server serves the default route `http://localhost:5555`. 

### `client/`

install your dependencies, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```


---

## Created By:

https://www.linkedin.com/in/karenhernandezc/
