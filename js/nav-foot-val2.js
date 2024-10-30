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