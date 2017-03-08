# Country-Region DropDown Menu
This javascript enables user to easily implement a country-region dropdown menu.
It is as simple as by entering the given attribute into the country and region dropdown menu respectively to make them works.
After that, the region dropdown will be automatically refresh on the change of country dropdown.

## Usage

    <html>
      <head>
        <meta charset="UTF-8">
        <script src="gds_cr.min.js"></script>
      </head>
      <body>

        <div>
            Country: <select class="gds-cr" country-data-region-id="gds-cr-one" ></select>

            Region: <select id="gds-cr-one" ></select>
        </div>

        <div>
            Country: <select class="gds-cr" country-data-region-id="gds-cr-two" country-data-default-value="United States"></select>

            Region: <select id="gds-cr-two" region-data-default-value="California"></select>
        </div>

      </body>
    </html>


## Attributes

* Country field **must** be given a class name as ```gds-cr``` .
* ```country-data-region-id``` is **required** in country field that contains the id of region field.
* ```country-data-default-value``` is optional in country field which use to set the default selected country value.
* ```region-data-default-value``` is optional in region field which use set the default selected region value. 

## Sample page

Please refer to example.html file.

## Support

Email: support@geodatasource.com  
URL: [http://www.geodatasource.com](http://www.geodatasource.com)