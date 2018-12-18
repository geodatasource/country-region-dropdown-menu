# Country-Region DropDown Menu
This javascript enables user to easily implement a country-region dropdown menu.
It is as simple as enter the pre-defined class name and attribute into the country and region dropdown menu (select box) respectively to make them works. After that, the region dropdown will be automatically refreshed upon the change of country selection.

This plugin supports the display of **ISO3166-1 (for Country Name)** and **ISO3166-2 (for Region Name)** standard.
* Total of 247 country name supported (except **Bouvet Island** and **Heard Island and Mcdonald Islands**, which have no region/subdivision defined)
* Please visit [ISO3166-2 Subdivision Code](https://www.ip2location.com/free/iso3166-2) to learn more about the **ISO3166-2** supported.

This plugin supports multilingual in various languages.

|Language code|Language Name|
|---|---|
|en|English|
|es|Spanish|
|fr|French|
|it|Italian|
|pt|Portuguese|
|zh-cn|Chinese Simplified|
|zh-tw|Chinese Traditional|

Please take a look on [How to add City DropDown to Country-Region DropDown Menu tutorial](https://www.geodatasource.com/resources/tutorials/add-city-dropdown-country-region-dropdown-menu/) to learn more about how City DropDown added.

## Demo

[![Country-Region DropDown Menu Demo 1](http://www.geodatasource.com/images/country-region-dropdown-menu-screenshot1.png)](https://www.geodatasource.com/software/country-region-dropdown-menu-demo)

[![Country-Region DropDown Menu Demo 2](http://www.geodatasource.com/images/country-region-dropdown-menu-screenshot2.png)](https://www.geodatasource.com/software/country-region-dropdown-menu-demo)

Please check on [demo](https://www.geodatasource.com/software/country-region-dropdown-menu-demo) page to have a clearer picture about how it works.

## Demo on JSFiddle

Please try out the demo on [JSFiddle](https://jsfiddle.net/geodatasource/1jsp9a50/) page.

## Usage

    <html>
      <head>
        <meta charset="UTF-8">
        <script src="assets/js/geodatasource-cr.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="assets/css/geodatasource-countryflag.css">

        <link rel="gettext" type="application/x-po" href="languages/en/LC_MESSAGES/en.po" />
        <script type="text/javascript" src="assets/js/Gettext.js"></script>
      </head>
      <body>

        <div>
            Country: <select class="gds-cr" country-data-region-id="gds-cr-one" ></select>

            Region: <select id="gds-cr-one" region-data-language="en"></select>
        </div>

        <div>
            Country: <select class="gds-cr" country-data-region-id="gds-cr-two" country-data-default-value="US" ></select>

            Region: <select id="gds-cr-two" region-data-language="en" region-data-default-value="California"></select>
        </div>

        <div>
            Country: <select class="gds-cr gds-countryflag" country-data-region-id="gds-cr-three" ></select>

            Region: <select id="gds-cr-three" region-data-language="en"></select>
        </div>

      </body>
    </html>


## Bootstrap Usage
If you are using Twitter Bootstrap, you may refer to the below example for the implementation.

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Country-Region DropDown Menu</title>
    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="assets/js/geodatasource-cr.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="assets/css/geodatasource-countryflag.css">

        <link rel="gettext" type="application/x-po" href="languages/en/LC_MESSAGES/en.po" />
        <script type="text/javascript" src="assets/js/Gettext.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center" style="margin-bottom:40px;">
                    <h2>Country-Region DropDown Menu</h2>
                </div>
                <div class="col-md-12">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Country</label>
                            <div class="col-sm-10">
                                <select class="form-control gds-cr gds-countryflag" country-data-region-id="gds-cr-1"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="gds-cr-1" class="col-sm-2 control-label">Region</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="gds-cr-1" region-data-language="en"></select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
    </html>


## Node.js Usage
The following steps show how to use the dropdown menu in **Express Web Framework**:

1. Install the module by ```npm install country-region-dropdown-menu```
2. Copy geodatasource-cr.min.js script and Gettext.js script to ```/public/javascripts/``` directory.
3. Copy geodatasource-countryflag.css stylesheet to ```/public/stylesheets/``` directory.
4. Copy geodatasource-countryflag.png image to ```/public/img/``` directory.
5. Copy languages folder to ```/public/``` directory.
6. Include the script in the jade file by ```script(src='/javascripts/geodatasource-cr.min.js')```
7. Include the script in the jade file by ```script(src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"))```
8. Include the script in the jade file by ```script(src="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js")```
9. Include the link in the jade file by ```link(rel='stylesheet' href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css")```
10. Include the link in the jade file by ```link(rel='stylesheet' href='stylesheets/geodatasource-countryflag.css')```
11. Include the link in the jade file by ```link(rel='gettext' type='application/x-po' href='languages/en/LC_MESSAGES/en.po')```
12. Include the script in the jade file by ```script(src='/javascripts/Gettext.js')```
13. Code for implementation:
```
    |Country:
    select.gds-cr(country-data-region-id="gds-cr-one").gds-countryflag
    |Region:
    select#gds-cr-one(region-data-language="en")
```

## Attributes

* Country field **must** be given a class name as ```gds-cr``` .
* ```gds-countryflag``` can be added to class name of country field to support country flag.
* ```country-data-region-id``` is **required** in country field that contains the id of region field.
* ```country-data-default-value``` is optional in country field which use to set the default selected country value, it supports both ISO3166-1 alpha-2 Country Code and country full name.
* ```region-data-language``` is **required** in region field which use set the language used in region data. 
* ```region-data-default-value``` is optional in region field which use set the default selected region value. 

## Country Flag Designs

* Square Country Flag with ```<link rel="stylesheet" href="assets/css/geodatasource-countryflag.css">```
![Square Country Flag](http://www.geodatasource.com/images/country-region-dropdown-menu-screenshot2.png)
* Round Country Flag with ```<link rel="stylesheet" href="assets/css/geodatasource-countryflag-round.css">```
![Round Country Flag](http://www.geodatasource.com/images/country-region-dropdown-menu-screenshot3.png)
* Marker Country Flag with ```<link rel="stylesheet" href="assets/css/geodatasource-countryflag-marker.css">```
![Marker Country Flag](http://www.geodatasource.com/images/country-region-dropdown-menu-screenshot4.png)

## Sample page

Please refer to example.html file.

## Support

Email: support@geodatasource.com  
URL: [https://www.geodatasource.com](https://www.geodatasource.com)

## Credits

* Round Country Flag is designed by Freepik from Flaticon [https://www.flaticon.com/packs/countrys-flags](https://www.flaticon.com/packs/countrys-flags)
* Marker Country Flag is designed by Freepik from Flaticon [https://www.flaticon.com/packs/country-flags](https://www.flaticon.com/packs/country-flags)
