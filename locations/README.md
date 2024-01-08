# Apex Example Location Hierarchy

To import the example location hierarchy in your system, you need a migration object with the "EHS - Location" and "EHS - Location hierarchy" objects. Import the files in the following order.

*Note:* You need to change the *Revision Start Date* on tab *Location Hierarchy Revision* in file `Apex Example - EHS - Location hierarchy.xml` to the start date of your hierarchy revision. If no hierarchy revision exists for the provided start date, it will create a new revision.

Migration Object | File | Note
-|-|-
EHS - Location | [Apex Example - EHS - Locations.xml](./Apex%20Example%20-%20EHS%20-%20Locations.xml) | -
EHS - Location hierarchy | [Apex Example - EHS - Location hierarchy.xml](./Apex%20Example%20-%20EHS%20-%20Location%20hierarchy.xml) | Check *Revision Start Date*
