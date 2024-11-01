
//1.navbar numbercounting donation valuenteer banner footbar script start

document.addEventListener("DOMContentLoaded", function () {
    // Load navbar.html into the navbar-placeholder div
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            // Fetch JSON data from projects.json
            fetch('programproject.json')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('programmes-container');


                    // Add "All Programmes" link
                    let allProgrammesHTML = `<li><a href="causes.html" style="color: #fff;">All Programmes</a><ul class="submenu2">`;
                    container.innerHTML += allProgrammesHTML; // Add it to the container

                    data.Programmes.forEach(programme => {

                        console.log(`program name : ${programme.name}`);
                        let programmeHTML = `<li><a style="color: #fff;">• ${programme.name}</a><ul class="submenu2">`;
                        programme.projects.forEach(project => {

                            const programmeParam = encodeURIComponent(programme.name);
                            const projectParam = encodeURIComponent(project.name);
                            const projectLink = `projects.html?programme=${programmeParam}&project=${projectParam}`;


                            console.log(`project name : ${project.name}`);
                            // Add each project link with URL parameters
                            programmeHTML += `<li><a href="${projectLink}" style="color: #fff;">• ${project.name}</a></li>`;
                        });

                        programmeHTML += `</ul></li>`;
                        container.innerHTML += programmeHTML;

                    });
                })
                .catch(error => {
                    console.error('Error fetching the JSON data:', error);
                });

            // Toggle display of the dropdown menu on "Programmes" click
            document.getElementById('programmes-toggle').addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior

                const dropdownMenu = document.getElementById('programmes-dropdown');

                // Toggle display
                if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
                    dropdownMenu.style.display = 'block';
                } else {
                    dropdownMenu.style.display = 'none';
                }
            });
        })
        .catch(error => console.error("Error loading navbar:", error));

    function initializeCounter() {
        $('.number').each(function () {
            const targetNumber = $(this).data('number'); // Get the target number from the data attribute
            $(this).animateNumber({ number: targetNumber }, 2000); // 2000ms duration
        });
    }

    // Load navbar.html into the navbar-placeholder div
    fetch("don-val-banner.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("don-val-banner-placeholder").innerHTML = data;
            // Initialize the counting effect after loading the new content
            initializeCounter();

        })
        .catch(error => console.error("Error loading don-val banner:", error));

    //Load footbar.html into the footbar-placeholder div
    fetch("footbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footbar-placeholder").innerHTML = data;

            fetch('blog_json.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data);  // Check if data is logged correctly
                    const monthMap = {
                        "january": 0, "february": 1, "march": 2, "april": 3,
                        "may": 4, "june": 5, "july": 6, "august": 7,
                        "september": 8, "october": 9, "november": 10, "december": 11
                    };

                    function parseDate(blogDate) {
                        const [year, monthName, day] = blogDate.split('-');
                        return new Date(year, monthMap[monthName.toLowerCase()], day);
                    }

                    // Sort and get top 3 blogs
                    const recentBlogs = data.blogs
                        .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                        .slice(0, 3);

                    // Select container where blog posts will be inserted
                    const container = document.getElementById('recent-blogs-container');

                    recentBlogs.forEach(blog => {
                        const blogHTML = `
                <div class="block-21 mb-4 d-flex">
                  <a class="blog-img mr-4" style="background-image: url(${blog.image});"></a>
                  <div class="text">
                    <h3 class="heading"><a href="blog-single.html?id=${blog.id}">${blog.title}</a></h3>
                    <div class="meta">
                      <div><a href="#"><span class="icon-calendar"></span> ${blog.date}</a></div>
                      <div><a href="#"><span class="icon-person"></span> Admin</a></div>
                      <div><a href="#"><span class="icon-chat"></span> ${blog.comment_count || 0}</a></div>
                    </div>
                  </div>
                </div>
            `;
                        container.innerHTML += blogHTML;
                    });
                })
                .catch(error => console.error('Error loading JSON:', error));


        })
        .catch(error => console.error("Error loading footbar:", error));


    fetch("valuenteer_banner.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("valuanteer-placeholder").innerHTML = data;
        }).catch(error => console.log("Error loading valuenteer banner : ", error));
});

//1.navbar numbercounting donation valuenteer banner footbar script end

//----------------------------------------------------------------

//2. owl carousel horizontal AND vertical mobiel touch fuction start
let startX, startY, isScrolling, resetTimeout;


const carousel = document.querySelector('.owl-carousel');

carousel.addEventListener('touchstart', function (e) {
    console.log('Touch Stated');
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
    isScrolling = undefined;  // Reset scrolling direction

    clearTimeout(resetTimeout);
});

carousel.addEventListener('touchmove', function (e) {
    console.log('Touch move');
    const dx = e.touches[0].pageX - startX;
    const dy = e.touches[0].pageY - startY;

    // Determine if scrolling is mostly vertical or horizontal
    if (isScrolling === undefined) {
        console.log('scrolling');
        isScrolling = Math.abs(dy) > Math.abs(dx);
    }

    if (isScrolling) {

        console.log('vertical scrolling');
        // If scrolling is vertical, let the page scroll
        //e.stopPropagation();
        carousel.style.pointerEvents = 'none';

        resetTimeout = setTimeout(function () {
            console.log('reset scrolling');
            carousel.style.pointerEvents = 'auto';
        }, 2000);

    } else {
        carousel.style.pointerEvents = 'auto';
    }
});

//2. owl carousel horizontal AND vertical mobiel touch fuction end

//------------------------------------------------------------------------


//3.blog event loading on intex.html     start
document.addEventListener("DOMContentLoaded", function () {
    fetch('blog_json.json')
        .then(response => response.json())
        .then(data => {
            const monthMap = {
                "january": 0, "february": 1, "march": 2, "april": 3,
                "may": 4, "june": 5, "july": 6, "august": 7,
                "september": 8, "october": 9, "november": 10, "december": 11
            };

            function parseDate(blogDate) {
                const [year, monthName, day] = blogDate.split('-');
                return new Date(year, monthMap[monthName.toLowerCase()], day);
            }

            // Sort and get top 3 blogs
            const recentBlogs = data.blogs
                .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                .slice(0, 3);

            // Container for recent blogs
            const container = document.getElementById('recent-main-blogs-container');

            recentBlogs.forEach(blog => {
                const blogHTML = `
        <div class="col-md-4 d-flex ftco-animate">
          <div class="blog-entry align-self-stretch">
            <a href="blog-single.html?id=${blog.id}" class="block-20" style="background-image: url('${blog.image}');"></a>
            <div class="text p-4 d-block">
              <div class="meta mb-3">
                <div><a href="#"><span class="icon-calendar"></span> ${blog.date}</a></div>
                <div><a href="#"><span class="icon-person"></span> Admin</a></div>
                <div><a href="#" class="meta-chat"><span class="icon-chat"></span> ${blog.comment_count || 0}</a></div>
              </div>
              <h3 class="heading mt-3"><a href="blog-single.html?id=${blog.id}">${blog.title}</a></h3>
              <p>${blog.description}</p>
            </div>
          </div>
        </div>
      `;
                container.innerHTML += blogHTML;
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

//3.blog event loading on intex.html     end

//-----------------------------------------------------------------------

//4. Function to parse time from the "HH:MM AM/PM" format to 24-hour format forevent remaining time calcualtion start
function parseTime(time) {
    const period = time.slice(-2); // AM or PM
    let [hours, minutes] = time.slice(0, -2).split(':').map(Number);

    if (period === 'PM' && hours < 12) {
        hours += 12; // Convert PM hours to 24-hour format
    } else if (period === 'AM' && hours === 12) {
        hours = 0; // Convert 12 AM to 0 hours
    }

    return [hours, minutes];
}


//4. Function to parse time from the "HH:MM AM/PM" format to 24-hour format forevent remaining time calcualtion end

//-------------------------------------------------------------------------------------

// 5. Fetch events data with annotation banner starting
fetch('event_json.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('events-container');
        const currentDateTime = new Date();

        // Get the first three events
        const recentEvents = data.event_entries.slice(0, 3);

        recentEvents.forEach(event => {
            const eventDate = new Date(event.date); // Parse the event date
            const [eventStartHour, eventStartMinute] = parseTime(event.time.split('-')[0].trim());
            const eventStartTime = new Date(eventDate);
            eventStartTime.setHours(eventStartHour, eventStartMinute); // Set event start time

            const [eventEndHour, eventEndMinute] = parseTime(event.time.split('-')[1].trim());
            const eventEndTime = new Date(eventDate);
            eventEndTime.setHours(eventEndHour, eventEndMinute); // Set event end time

            let bannerText = '';
            let bannerStyle = '';

            if (eventStartTime > currentDateTime) {
                // Event is upcoming
                const timeDiff = eventStartTime - currentDateTime;
                const hours = Math.floor((timeDiff / (1000 * 60 * 60))); // Calculate remaining hours
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes
                bannerText = hours >= 24 ? `Upcoming in ${Math.floor(hours / 24)}d ${hours % 24}h ${minutes}m` : `Upcoming in ${hours}h ${minutes}m`;
                bannerStyle = 'background-color: green; color: white; padding: 5px; position: absolute; top: 10px; left: 10px;'; // Green for upcoming
            } else if (eventEndTime > currentDateTime) {
                // Event is ongoing
                bannerText = 'Ongoing';
                bannerStyle = 'background-color: orange; color: white; padding: 5px; position: absolute; top: 10px; left: 10px;'; // Orange for ongoing
            } else {
                // Event is completed
                bannerText = 'Completed';
                bannerStyle = 'background-color: red; color: white; padding: 5px; position: absolute; top: 10px; left: 10px;'; // Red for completed
            }

            // Construct the HTML for the event
            const eventHTML = `
    <div class="col-md-4 d-flex ftco-animate">
      <div class="blog-entry align-self-stretch" style="position: relative;">
        <a href="event-single.html?id=event${event.id}" class="block-20" style="background-image: url('${event.image_url}');">
        </a>
        <div style="${bannerStyle}">${bannerText}</div>
        <div class="text p-4 d-block">
          <div class="meta mb-3">
            <div><a href="#">${event.date}</a></div>
            <div><a href="#">Admin</a></div>
            <div><a href="#" class="meta-chat"><span class="icon-chat"></span>${event.comments_count}</a></div>
          </div>
          <h3 class="heading mt-3"><a href="blog-single.html?id=event${event.id}">${event.title}</a></h3>
          <p class="time-loc"><span class="mr-2"><i class="icon-clock-o"></i>${event.time}</span></p>
          <p>${event.short_description}</p>
        </div>
      </div>
    </div>
    `;

            // Insert the event HTML into the container
            container.innerHTML += eventHTML;
        });
    })
    .catch(error => console.error('Error loading events:', error));

// 5. Fetch events data with annotation banner end

//------------------------------------------------------------------------------------

// 6.
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.navbar .nav-link');

    // Get the current URL path
    const currentPath = window.location.pathname.split('/').pop(); // Gets the current page name, e.g., "about.html"

    console.log('Current URL path: ' + currentPath);
    // Highlight the corresponding link
    links.forEach(link => {
        const linkHref = link.getAttribute('href'); // Get href attribute of each link
        if (linkHref === currentPath) {
            link.classList.add('active'); // Add active class if href matches current page
            link.style.color = "#ff0000"; // Change to your desired active color
        } else {
            link.classList.remove('active'); // Optional: Remove active class from other links
            link.style.color = ""; // Reset color for non-active links
        }
    });
});

//7. program link open with nested 
// Fetch JSON data from projects.json
fetch('programproject.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('programmes-container');          // Add "All Programmes" link
        let allProgrammesHTML = `<li><a href="causes.html" style="color: #fff;">All Programmes</a><ul class="submenu2">`;
        container.innerHTML += allProgrammesHTML; // Add it to the container

        data.Programmes.forEach(programme => {

            console.log(`program name : ${programme.name}`);
            let programmeHTML = `<li><a style="color: #fff;"> ${programme.name}</a><ul class="submenu2">`;
            programme.projects.forEach(project => {

                const programmeParam = encodeURIComponent(programme.name);
                const projectParam = encodeURIComponent(project.name);
                const projectLink = `projects.html?programme=${programmeParam}&project=${projectParam}`;


                console.log(`project name : ${project.name}`);
                // Add each project link with URL parameters
                programmeHTML += `<li><a href="${projectLink}" style="color: #fff;">${project.name}</a></li>`;
            });

            programmeHTML += `</ul></li>`;
            container.innerHTML += programmeHTML;
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });


// 8. mainl sending from donation page for valuenteer send message
function sendEmail() {
    const userName = document.getElementById("user_name").value;
    const userEmail = document.getElementById("user_email").value;
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value; // Read the subject from the hidden field

    // Encode email content
    const encodedSubject = encodeURIComponent(subject);
    const body = encodeURIComponent(`Name: ${userName}\nEmail: ${userEmail}\nMessage: ${message}`);

    // Open user's default mail client with pre-filled information
    window.location.href = `mailto:ajmalyousufza@gmail.com?subject=${encodedSubject}&body=${body}`;
}


function noEditAlert() {
    alert("This field cannot be edited. Please fill in the other fields and send the form.");
}

