const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')
const data = require('./data')
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`)
		return self.connection.dropDatabase()
	})
	.then(() => {
		Recipe.create(firstRecipe).then((firstRecipe) => {
			console.log(`${firstRecipe.title}`)
		})
	})
	.then(() => {
		return Recipe.insertMany(data).then((data) => {
			for (let i = 0; i < data.length; i++) {
				console.log(`${data[i].title}`)
			}
		})
	})
	.then(() => {
		return Recipe.updateOne(
			{ title: 'Rigatoni alla Genovese' },
			{ duration: 100 }
		)
			.then(() => {
				console.log(`Success!`)
			})
			.catch((error) => {
				console.log(error)
			})
	})
	.then(() => {
		return Recipe.deleteOne({ title: 'Carrot Cake' }).then(() => {
			console.log('Carrot Cake was removed!')
		})
	})
	.then(() => {
		mongoose.connection
			.close()
			.then(() => {
				console.log('Yes!')
			})
			.catch((err) => {
				console.log(err)
			})
	})
	.catch((error) => {
		console.error('Error connecting to the database', error)
	})
