[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ehs-environment-management-samples)](https://api.reuse.software/info/github.com/SAP-samples/ehs-environment-management-samples)

# SAP EHS Environment Management Samples

## Description

Find examples for mass creating business objects using the SAP Migration Cockpit, code examples on the use APIs and other useful stuff for getting started with SAP EHS Environment Management in this project.

This project is currently in construction.

## Requirements

You need a license of [SAP Environment, Health and Safety Management](https://www.sap.com/germany/products/scm/ehs-management-health-safety.html) for Environment Management, for one of this SAP products:

* [SAP S/4HANA Cloud, public edition](https://help.sap.com/docs/SAP_S4HANA_CLOUD?locale=en-US)
* [SAP S/4HANA Cloud, private edition](https://help.sap.com/docs/SAP_S4HANA_CLOUD_PE?locale=en-US)
* [SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_CLOUD?locale=en-US)

Which of the examples work may vary. It is recommended to use the latest available version.

## Content

You can download the content by choosing the option *Download ZIP* from the *<> Code* drop downbutton.

### Greenhouse Gas Management

#### Data Classifiers for Greenhouse Gas Management

It is recommended to use the standard data classifiers for your Compliance Scenario activities.

&rarr; [greenhouse-gas-management/classifiers/Standard Data Classifiers.xml](./greenhouse-gas-management/classifiers/Standard%20Data%20Classifiers.xml)

You can use the *EHS - Data Classifier* migration object to import the classifiers with the [SAP S/4HANA Migration Cockpit](https://www.sap.com/documents/2017/07/26113ac0-c47c-0010-82c7-eda71af511fa.html).

Please find further information on how to use the data classifiers in the blog post "[Manage Your Greenhouse Gas (GHG) Emission Inventory with SAP EHS Environment Management](https://blogs.sap.com/2023/06/23/manage-your-greenhouse-gas-ghg-emission-inventory-with-sap-ehs-environment-management/)".

### Example Locations

There is an example location hierarchy in the folder [locations](./locations/)

## Mappings

You can find mappings for domain values for the use with the Migration Cockpit for SAP S/4HANA to reduce the mapping effort and to show which values are allowed for a field.

&rarr; [mappings](./mappings/)


## Contributing

This project is maintained by SAP. Contribution is currently not possible.

## Code of Conduct

Checkout the [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) file for more details on the code of conduct for this open source project.

## Download

If you have a Git client, you can clone this Git repository by running:

```
git clone https://github.com/SAP-samples/ehs-environment-management-samples.git
```

Alternatively, please use the *Download ZIP* option in *<> Code* menu of this GitHub repository and unpack the downloaded ZIP file.

## Known Issues

No known issues.

## How to Obtain Support

[Create an issue](https://github.com/SAP-samples/ehs-environment-management-samples/issues) in this repository if you find a bug or have questions about the content.

For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## To-Do (Upcoming changes)

You can watch this GitHub repository to stay informed on updates.

## License

Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
