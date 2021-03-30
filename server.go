package main

import (
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/roylisto/gin-golang-react/api"
)

var (
	router api.Router = api.NewRouter()
)

func main() {
	// Load ENV from .env file
	err := godotenv.Load()
	if err != nil {
		panic("error loading .env file")
	}

	// Set the router as the default one shipped with Gin
	app := gin.Default()

	// Serve frontend static files
	app.Use(static.Serve("/", static.LocalFile("./dist", true)))

	// Initialize the route
	router.SetupRouter(app)

	// Start and run the server on localhost as default
	app.Run("127.0.0.1:" + os.Getenv("PORT"))
}
