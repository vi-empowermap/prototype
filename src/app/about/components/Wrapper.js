import MenuNav from "@/app/components/MenuNav";

const Wrapper = ({
  kirbyPanelData: {
    result: { content: data },
  },
  kirbyPanelHomeData
}) => {
  
  return (
    <div className="w-screen min-h-[100svh] lg:min-h-screen h-full bg-white relative pt-[44px]">
      <MenuNav kirbyPanelHomeData={kirbyPanelHomeData} />
      <div className="w-full h-fit px-6 py-10">
        <div className="text-2xl font-medium mb-4">{data.about_title}</div>
        <p className="columns-2 font-jetBrainsMonoLight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis tortor, rutrum a nisi id, ullamcorper rutrum risus. Cras tincidunt eget ante non tincidunt. Praesent ultrices turpis sed purus posuere, et semper erat consectetur. Praesent pharetra viverra nisl, eget molestie dui congue nec. Mauris tincidunt dui sed orci accumsan pellentesque. In congue metus sit amet tincidunt aliquet. Vestibulum lobortis neque feugiat convallis maximus. Mauris tincidunt in leo vel viverra. Curabitur congue augue elit, quis vulputate erat auctor sit amet. Donec quis sapien ac elit laoreet facilisis a id tortor. In euismod mattis massa a tincidunt. Suspendisse potenti. Sed porta turpis sed hendrerit malesuada. Donec quis ipsum viverra, viverra lorem non, scelerisque nulla.

Suspendisse quis vestibulum sem. Nunc gravida blandit posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas finibus eu nisi id feugiat. Quisque eget aliquam nibh. Suspendisse dignissim nisi eros, quis facilisis ante accumsan sed. Maecenas id nisl ex. Mauris metus velit, fringilla nec massa ut, aliquet consequat dolor. Cras ac nulla molestie enim posuere dictum. Quisque eros est, tempor eget quam at, congue faucibus risus. Nam in urna mi.

Pellentesque mi tortor, pellentesque sed facilisis ut, vestibulum et lacus. Nam sed dui vitae ligula tincidunt rhoncus sit amet sit amet nulla. Pellentesque lorem neque, pulvinar ac tellus nec, porta ultrices quam. Donec vitae vestibulum nisl. Duis eget eros a ex pellentesque gravida quis quis metus. Mauris placerat semper consectetur. Vestibulum elementum lacus sed neque euismod, sed feugiat erat luctus. Sed est tellus, maximus a facilisis ut, tempus ultrices quam. Nunc vitae felis in metus egestas sodales a sed urna.

Sed porttitor congue lectus et aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Integer elementum neque non magna consequat consequat. Donec ac facilisis odio. Phasellus elementum orci sed quam sollicitudin, et commodo quam facilisis. Maecenas at mi non risus ullamcorper fringilla nec a sapien. Donec mollis sapien dolor, ut hendrerit odio imperdiet aliquam. Maecenas posuere lacus non justo rutrum rhoncus. Ut dignissim nisl urna, sed euismod nulla dictum eu. Suspendisse rutrum augue non ligula euismod, quis aliquet odio ultrices.

Fusce iaculis fringilla mi, suscipit sodales nunc feugiat tincidunt. Quisque facilisis aliquam quam, ac luctus mi ullamcorper at. Nam blandit, libero sed ultrices posuere, arcu nisi viverra sapien, at ornare est magna nec ligula. Etiam non pretium lacus, eget vehicula metus. Maecenas vulputate tincidunt eros nec porttitor. Donec in velit et dolor porttitor elementum. Mauris tristique justo et massa convallis blandit.</p>
      </div>
    </div>
  );
};

export default Wrapper;
