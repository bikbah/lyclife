package main

import (
	"flag"
	"fmt"
	"html/template"
	"io/ioutil"

	"github.com/bikbah/lyclife/mtemplate"
	"github.com/gin-gonic/gin"
)

var (
	templFuncMap = make(template.FuncMap)
)

var (
	staticDirF = flag.String("static", "./static", "Static files dir")
)

func main() {
	flag.Parse()

	router := gin.Default()

	router.HTMLRender = createMyRender()
	router.Static("/static", *staticDirF)
	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "base", nil)
	})
	router.Run(":8888")
}

func createMyRender() mtemplate.Render {

	templFuncMap["static"] = func() template.HTML {
		return template.HTML(fmt.Sprint("static/"))
	}
	templFuncMap["news_load"] = func() template.HTML {
		return template.HTML(fmt.Sprint("news_load"))
	}

	templFuncMap["topmenu"] = func() template.HTML {
		return template.HTML(fmt.Sprint(`topmenu`))
	}

	r := mtemplate.New()
	//r.AddFromFiles("index", "templates/base.html", "templates/layout.html", "templates/index.html")

	//t2 := template.Must(template.ParseFiles("templates/layout.html", "templates/base.html"))
	//t2 = t2.Funcs(templFuncMap)
	bytesBase, err := ioutil.ReadFile("templates/base.html")
	check(err)
	bytesLayout, err := ioutil.ReadFile("templates/layout.html")
	check(err)
	bytesPage, err := ioutil.ReadFile("templates/index.html")
	check(err)

	t := template.New("base")
	t = t.Funcs(templFuncMap)
	t, err = t.Parse(string(bytesBase))
	check(err)

	t, _ = t.Clone()
	t = t.New("layout")
	t, err = t.Parse(string(bytesLayout))
	check(err)

	t, _ = t.Clone()
	t = t.New("index")
	t, err = t.Parse(string(bytesPage))
	check(err)

	r.Add("base", t)

	return r
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
