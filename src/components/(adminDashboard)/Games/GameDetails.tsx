import { Divider, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  details: any;
};

const GameDetails = ({ open, setOpen, details }: TPropsType) => {
  const {
    title,
    subTitle,
    description,
    author,
    platform,
    categories,
    price,
    socialLinks,
    userId,
  } = details || {};

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      <div className="pb-20 text-white/80">
        <div className="flex justify-between items-center">
          <h4 className="text-center text-xl font-medium">Game Details</h4>
          <div
            className="w-10 h-10 bg-main-color rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine size={18} color="#fff" />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <div>
            <strong>Title:</strong> {title}
          </div>
          <div>
            <strong>Sub Title:</strong> {subTitle}
          </div>
          <div>
            <strong>Description:</strong> {description}
          </div>
          <div>
            <strong>Author:</strong> {author}
          </div>
          <div>
            <strong>Price:</strong> ${price}
          </div>
          <div>
            <strong>Platforms:</strong> {platform?.join(", ")}
          </div>
          <div>
            <strong>Categories:</strong> {categories?.join(", ")}
          </div>
          <div>
            <strong>Posted by:</strong> {userId?.name || userId?.email || "N/A"}
          </div>
          <div>
            <strong>Social Links:</strong>
            <ul className="list-disc pl-5">
              {socialLinks?.map((link: any) => (
                <li key={link._id}>
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameDetails;
