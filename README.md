# Description

This project implements a funnel app using ReactJS, TypeScript, and Tailwind CSS. It allows users to upload JSON files containing funnel data, displays the funnels dynamically, and provides error handling for invalid file formats.

# Setup
 - `yarn install` To install dependencies

 - `yarn run dev` Runs the app in the development mode.

 - `yarn test`  To run tests

 - `yarn css` To run css

# Directory Structure of components/containers
 - The code is structured into functional components and hooks for better readability and maintainability.

								       App
									|
								(components + styles)
								Main screen + test file
							             |   	    |
								FunnelPreview  FileUploadButton	
								     | 
								  Carousel
								     |
								    Page 
			                                             |
							____________Blocks(folder)_______________                               
							|		 |          |           |
							Textual     	List   	  Button       Image
							|		  
							Accordion    

# Architecture
 - components: All the folders of react components used in the app. Each folder contains a tsx file for rendering + test files for testing the functionality
 - Testing: Unit tests for MainScreen added

# Features
 - Users can upload JSON files containing funnel data.
 - Funnel data is dynamically displayed using carousels. Each Funnel block takes the whole mobile screen viewport.
 - For ease in scrolling, arrow buttons are added in top, left, right and bottom. Normal scrolling works as well.
 - To transition between different funnel pages, arrow buttons are added at the left and right.
 - Error handling is implemented for invalid file formats and other errors.
 - Loading states are displayed while fetching data.
 - Responsive UI ensures compatibility across different devices.
 - Swift transitional animation added to Carousel and List component.

# Third-party libraries
 - tailwindcss
							
