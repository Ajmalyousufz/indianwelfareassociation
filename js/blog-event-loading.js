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

// Function to parse time from the "HH:MM AM/PM" format to 24-hour format
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

// Fetch events data
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

