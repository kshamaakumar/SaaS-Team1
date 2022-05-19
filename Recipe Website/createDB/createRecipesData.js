db = db.getSiblingDB('recipeWebsiteDatabase')
db.createCollection('recipes')
recipesCollection = db.getCollection("recipes")
recipesCollection.remove({})
recipesCollection.insert(
{
	
	recipeId: 1,
	recipeName: "Avocado Deviled Eggs",
	description: "1.Scoop egg yolks into a bowl; add avocado, 2/3 of chopped turkey bacon, mayonnaise, lime juice, garlic, cayenne pepper, and salt. Mash egg yolk mixture until filling is evenly combined. \n 2.Spoon filling into a piping bag or plastic bag with a snipped corner. Pipe filling into each egg white; top with a turkey bacon piece, jalapeno slice, and dash hot sauce.",
	userId: 1
}
)

recipesCollection.insert(
{
	recipeId: 2,
	recipeName: "Air-Fried Bang Bang Salmon",
	description: "Step1 Preheat an air fryer to 400 degrees F (200 degrees C). \nStep2 Prepare sauce by whisking mayonnaise, chili sauce, and Sriracha together in a small bowl until well blended. \n Step3 Spread 1 tablespoon sauce over the top of each salmon fillet. Reserve remaining sauce for serving. \nStep4 Lightly coat the air fryer basket with cooking spray. Place fillets in the air fryer basket with the sauce facing up. \nStep5 Air-fry until salmon flakes easily with a fork, about 10 minutes. \nStep6 To serve, drizzle salmon with extra sauce and sprinkle green onion over top.",
	userId: 1
  
})

recipesCollection.insert(
{
	recipeId: 3,
	recipeName: "Lemon Chicken",
	description: "1.Make a lemon chicken marinade. Well, it’s really more like a rub or a paste, because our lemon chicken recipe requires no actual marinating (yay!). But basically, we coat the chicken breasts in a thick, olive oil-based herb paste flavored with oregano, thyme, garlic powder, salt and pepper. \n2.Make the lemon chicken sauce! Stir together all of the zingy things—white wine, fresh garlic, lemon zest, lemon juice—to make the sauce that the chicken breasts will bake in. You’ll also use this sauce to baste the chicken as it bakes, ensuring that these bright flavors have a chance to be absorbed by the chicken (without having to actually marinate the chicken). \n3.Bake! Until you get that internal temperature reading of 165°F. Then it’s time to dig in!",
	userId: 2
}
)

recipesCollection.insert(
{
	recipeId: 4,
	recipeName: "Classic Shrimp Scampi",
	description:"1.Bring a large pot of salted water to a boil. Add the linguine and cook as the label directs. Reserve 1 cup cooking water, then drain. \n2.Meanwhile, season the shrimp with salt. Heat the olive oil in a large skillet over medium-high heat. Add the garlic and red pepper flakes and cook until the garlic is just golden, 30 seconds to 1 minute. Add the shrimp and cook, stirring occasionally, until pink and just cooked through, 1 to 2 minutes per side. Remove the shrimp to a plate. Add the wine and lemon juice to the skillet and simmer until slightly reduced, 2 minutes.  \n3.Return the shrimp and any juices from the plate to the skillet along with the linguine, butter and 1/2 cup of the reserved cooking water. Continue to cook, tossing, until the butter is melted and the shrimp is hot, about 2 minutes, adding more of the reserved cooking water as needed. Season with salt; stir in the parsley. Serve with lemon wedges. ",
	userId: 2
})

db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
	userId : 1,
	userName: "John",
	recipes : [
	 {
	  recipeId: 1,
	  recipeId: 2,
	 }
	]
}
)

usersCollection.insert(
	{
		userId : 2,
		userName: "Alice",
		recipes : [
		 {
		  recipeId: 3,
		  recipeId: 4,
		 }
		]
	}
	)