const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.font = '16px Arial';

const scale = 20;
canvas.width = 400;
canvas.height = 400;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let headImg = new Image();
headImg.src = 'snake.png';
let fruit;
let isPaused = false; // Initially, the game is not paused
let raf;

const vocabulary = [
    { word: "Apple", definition: "A round fruit with red, yellow, or green skin and sweet to tart flesh." },
    { word: "Application", definition: "A formal request to an authority for something." },
    { word: "Approximately", definition: "Close to the actual, but not completely accurate or exact." },
    { word: "Apprentice", definition: "A person who is learning a trade from a skilled employer, having agreed to work for a fixed period." },
    { word: "Approach", definition: "Come near or nearer to (someone or something) in distance." },
    { word: "Apricot", definition: "A juicy, soft fruit of an orange-yellow color resembling a small peach." },
    { word: "Aptitude", definition: "A natural ability to do something." },
    { word: "Aquarium", definition: "A transparent tank of water in which fish and other water creatures and plants are kept." },
    { word: "Arbitrary", definition: "Based on random choice or personal whim, rather than any reason or system." },
    { word: "Architecture", definition: "The art or practice of designing and constructing buildings." },
    { word: "Archive", definition: "A collection of historical documents or records providing information about a place, institution, or group of people." },
    { word: "Arctic", definition: "Relating to the regions around the North Pole." },
    { word: "Ardent", definition: "Enthusiastic or passionate." },
    { word: "Area", definition: "A region or part of a town, a country, or the world." },
    { word: "Argument", definition: "An exchange of diverging or opposite views, typically a heated or angry one." },
    { word: "Arithmetic", definition: "The branch of mathematics dealing with the properties and manipulation of numbers." },
    { word: "Armada", definition: "A fleet of warships." },
    { word: "Arrival", definition: "The action or process of arriving." },
    { word: "Article", definition: "A piece of writing included with others in a newspaper, magazine, or other publication." },
    { word: "Artisan", definition: "A worker in a skilled trade, especially one that involves making things by hand." },
    { word: "Asphalt", definition: "A mixture of dark bituminous pitch with sand or gravel, used for surfacing roads, flooring, roofing, etc." },
    { word: "Aspire", definition: "Direct one's hopes or ambitions towards achieving something." },
    { word: "Assault", definition: "Make a physical attack on." },
    { word: "Assembly", definition: "A group of people gathered together in one place for a common purpose." },
    { word: "Assessment", definition: "The evaluation or estimation of the nature, quality, or ability of someone or something." },
    { word: "Asset", definition: "A useful or valuable thing, person, or quality." },
    { word: "Assimilate", definition: "Take in (information, ideas, or culture) and understand fully." },
    { word: "Assist", definition: "Help (someone), typically by doing a share of the work." },
    { word: "Associate", definition: "Connect (someone or something) with something else in one's mind." },
    { word: "Assumption", definition: "A thing that is accepted as true or as certain to happen, without proof." },
    { word: "Astronomy", definition: "The branch of science which deals with celestial objects, space, and the physical universe as a whole." },
    { word: "Asylum", definition: "The protection granted by a nation to someone who has left their native country as a political refugee." },
    { word: "Athletic", definition: "Physically strong, fit, and active." },
    { word: "Atmosphere", definition: "The envelope of gases surrounding the earth or another planet." },
    { word: "Attach", definition: "Fasten; join." },
    { word: "Attain", definition: "Succeed in achieving (something that one desires and has worked for)." },
    { word: "Attempt", definition: "Make an effort to achieve or complete (something, typically a difficult task or action)." },
    { word: "Attention", definition: "Notice taken of someone or something; the regarding of someone or something as interesting or important." },
    { word: "Attorney", definition: "A person appointed to act for another in business or legal matters." },
    { word: "Attract", definition: "Cause to come to a place or participate in a venture by offering something of interest, favorable conditions, or opportunities." },
    { word: "Audience", definition: "The assembled spectators or listeners at a public event, such as a play, movie, concert, or meeting." },
    { word: "Audit", definition: "A systematic review or assessment of something." },
    { word: "Augment", definition: "Make (something) greater by adding to it; increase." },
    { word: "Author", definition: "A writer of a book, article, or report." },
    { word: "Authority", definition: "The power or right to give orders, make decisions, and enforce obedience." },
    { word: "Autonomy", definition: "The right or condition of self-government." },
    { word: "Available", definition: "Able to be used or obtained; at someone's disposal." },
    { word: "Avenue", definition: "A broad road in a town or city, typically having trees at regular intervals along its sides." },
    { word: "Average", definition: "A number expressing the central or typical value in a set of data, in particular the mode, median, or (most commonly) the mean, which is calculated by dividing the sum of the values in the set by their number." },
    { word: "Avocado", definition: "A fruit with a tough skin, smooth oily edible flesh, and a large seed." },
    { word: "Awaken", definition: "Rouse from sleep; cause to stop sleeping." },
    { word: "Aware", definition: "Having knowledge or perception of a situation or fact." },
    { word: "Awesome", definition: "Extremely impressive or daunting; inspiring great admiration, apprehension, or fear." },
    { word: "Awful", definition: "Very bad or unpleasant." },
    { word: "Awkward", definition: "Causing difficulty; hard to do or deal with." },
    { word: "Combine", definition: "Join or merge to form a single unit or substance." },
    { word: "Comfort", definition: "A state of physical ease and freedom from pain or constraint." },
    { word: "Coming", definition: "Arriving at a place or position." },
    { word: "Command", definition: "Give an authoritative order." },
    { word: "Commence", definition: "Begin; start." },
    { word: "Commission", definition: "An instruction, command, or role given to a person or group." },
    { word: "Commit", definition: "Perpetrate or carry out (a mistake, crime, or immoral act)." },
    { word: "Commodity", definition: "A raw material or primary agricultural product that can be bought and sold, such as copper or coffee." },
    { word: "Common", definition: "Occurring, found, or done often; prevalent." },
    { word: "Communicate", definition: "Share or exchange information, news, or ideas." },
    { word: "Community", definition: "A group of people living in the same place or having a particular characteristic in common." },
    { word: "Company", definition: "A commercial business." },
    { word: "Comparative", definition: "Perceptible by comparison; relative." },
    { word: "Compass", definition: "An instrument containing a magnetized pointer which shows the direction of magnetic north and bearings from it." },
    { word: "Compel", definition: "Force or oblige (someone) to do something." },
    { word: "Compensate", definition: "Give (someone) something, typically money, in recognition of loss, suffering, or injury incurred; recompense." },
    { word: "Compete", definition: "Strive to gain or win something by defeating or establishing superiority over others." },
    { word: "Complex", definition: "Consisting of many different and connected parts." },
    { word: "Component", definition: "A part or element of a larger whole." },
    { word: "Compose", definition: "Write or create (a work of art, especially music or poetry)." },
    { word: "Compound", definition: "A thing that is composed of two or more separate elements; a mixture." },
    { word: "Comprehensive", definition: "Complete; including all or nearly all elements or aspects of something." },
    { word: "Compress", definition: "Flatten by pressure; squeeze or press." },
    { word: "Compromise", definition: "An agreement or settlement of a dispute that is reached by each side making concessions." },
    { word: "Computation", definition: "The action of mathematical calculation." },
    { word: "Compute", definition: "Calculate or reckon (a figure or amount)." },
    { word: "Computer", definition: "An electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program." },
    { word: "Comrade", definition: "A companion who shares one's activities or is a fellow member of an organization." },
    { word: "Conceal", definition: "Keep from sight; hide." },
    { word: "Concede", definition: "Admit that something is true or valid after first denying or resisting it." },
    { word: "Conceive", definition: "Form or devise (a plan or idea) in the mind." },
    { word: "Concentrate", definition: "Focus all one's attention on a particular object or activity." },
    { word: "Concept", definition: "An abstract idea; a general notion." },
    { word: "Concern", definition: "Relate to; be about." },
    { word: "Concert", definition: "A musical performance given in public, typically by several performers or of several compositions." },
    { word: "Conclude", definition: "Bring (something) to an end." },
    { word: "Concrete", definition: "Existing in a material or physical form; real or solid; not abstract." },
    { word: "Condition", definition: "The state of something with regard to its appearance, quality, or working order." },
    { word: "Conduct", definition: "The manner in which a person behaves, especially in a particular place or situation." },
    { word: "Confer", definition: "Have discussions; exchange opinions." },
    { word: "Confess", definition: "Admit or state that one has committed a crime or is at fault in some way." },
    { word: "Confidence", definition: "The feeling or belief that one can rely on someone or something; firm trust." },
    { word: "Configure", definition: "Arrange or order (a computer system or an element of it) so as to fit it for a designated task." },
    { word: "Confirm", definition: "Establish the truth or correctness of (something previously believed or suspected to be the case)." },
    { word: "Conflict", definition: "A serious disagreement or argument, typically a protracted one." },
    { word: "Conform", definition: "Comply with rules, standards, or laws." },
    { word: "Congest", definition: "Block or become blocked with an accumulation of too much matter." },
    { word: "Congratulate", definition: "Give (someone) one's good wishes when something special or pleasant has happened to them." },
    { word: "Congress", definition: "A formal meeting or series of meetings for discussion between delegates, especially those from a political party or labor union or from within a particular discipline." },
    { word: "Conjunction", definition: "A word used to connect clauses or sentences or to coordinate words in the same clause (e.g. and, but, if)." },
    { word: "Connect", definition: "Bring together or into contact so that a real or notional link is established." },
    { word: "Conquer", definition: "Overcome and take control of (a place or people) by use of military force." },
    { word: "Conscious", definition: "Aware of and responding to one's surroundings; awake." },
    { word: "Consecutive", definition: "Following continuously." },
    { word: "Consensus", definition: "General agreement." },
    { word: "Consent", definition: "Permission for something to happen or agreement to do something." },
    { word: "Consequence", definition: "A result or effect of an action or condition." },
    { word: "Conservative", definition: "Averse to change or innovation and holding traditional values." },
    { word: "Consider", definition: "Think carefully about (something), typically before making a decision." },
    { word: "Consist", definition: "Be composed or made up of." },
    { word: "Console", definition: "Comfort (someone) at a time of grief or disappointment." },
    { word: "Consolidate", definition: "Make (something) physically stronger or more solid." },
    { word: "Consonant", definition: "A basic speech sound in which the breath is at least partly obstructed." },
    { word: "Conspire", definition: "Make secret plans jointly to commit an unlawful or harmful act." },
    { word: "Constant", definition: "Occurring continuously over a period of time." },
    { word: "Constrain", definition: "Compel or force (someone) to follow a particular course of action." },
    { word: "Construct", definition: "Build or erect (something, typically a building, road, or machine)." },
    { word: "Consult", definition: "Seek information or advice from (someone, especially an expert or professional)." },
    { word: "Consume", definition: "Eat, drink, or ingest (food or drink)." },
    { word: "Contact", definition: "The state or condition of physical touching." },
    { word: "Contain", definition: "Have or hold (someone or something) within." },
    { word: "Contemplate", definition: "Look thoughtfully for a long time at." },
    { word: "Contemporary", definition: "Living or occurring at the same time." },
    { word: "Content", definition: "In a state of peaceful happiness." },
    { word: "Contest", definition: "An event in which people compete for supremacy in a sport or other activity, or in a quality." },
    { word: "Context", definition: "The circumstances that form the setting for an event, statement, or idea, and in terms of which it can be fully understood." },
    { word: "Continent", definition: "Any of the world's main continuous expanses of land (Europe, Asia, Africa, North and South America, Australia, Antarctica)." },
    { word: "Continue", definition: "Persist in an activity or process." },
    { word: "Contour", definition: "An outline representing or bounding the shape or form of something." },
    { word: "Contract", definition: "A written or spoken agreement, especially one concerning employment, sales, or tenancy, that is intended to be enforceable by law." },
    { word: "Contrast", definition: "The state of being strikingly different from something else in juxtaposition or close association." },
    { word: "Contribute", definition: "Give (something, especially money) in order to help achieve or provide something." },
    { word: "Control", definition: "The power to influence or direct people's behavior or the course of events." },
    { word: "Controversial", definition: "Giving rise or likely to give rise to controversy or public disagreement." },
    { word: "Convene", definition: "Come or bring together for a meeting or activity; assemble." },
    { word: "Convenience", definition: "The state of being able to proceed with something with little effort or difficulty." },
    { word: "Convention", definition: "A way in which something is usually done." },
    { word: "Converge", definition: "Tend to meet at a point." },
    { word: "Converse", definition: "Engage in conversation." },
    { word: "Convert", definition: "Cause to change in form, character, or function." },
    { word: "Convey", definition: "Transport or carry to a place." },
    { word: "Convict", definition: "Declare (someone) to be guilty of a criminal offense by the verdict of a jury or the decision of a judge in a court of law." },
    { word: "Convince", definition: "Cause (someone) to believe firmly in the truth of something." },
    { word: "Cook", definition: "Prepare (food, a dish, or a meal) by combining and heating the ingredients in various ways." },
    { word: "Cool", definition: "Of or at a fairly low temperature." },
    { word: "Cooperate", definition: "Act jointly; work toward the same end." },
    { word: "Coordinate", definition: "Bring the different elements of (a complex activity or organization) into a harmonious or efficient relationship." },
    { word: "Cop", definition: "Catch or arrest (an offender)." },
    { word: "Cope", definition: "(of a person) deal effectively with something difficult." },
    { word: "Copy", definition: "A thing made to be similar or identical to another." },
    { word: "Perfect", definition: "Having all the required or desirable elements, qualities, or characteristics; as good as it is possible to be." },
    { word: "Permit", definition: "Officially allow (someone) to do something." },
    { word: "Person", definition: "A human being regarded as an individual." },
    { word: "Perforate", definition: "Pierce and make a hole or holes in." },
    { word: "Perennial", definition: "Lasting or existing for a long or apparently infinite time; enduring or continually recurring." },
    { word: "Perception", definition: "The ability to see, hear, or become aware of something through the senses." },
    { word: "Perceptive", definition: "Having or showing sensitive insight." },
    { word: "Percolate", definition: "(of a liquid or gas) filter gradually through a porous surface or substance." },
    { word: "Percussion", definition: "Musical instruments played by striking with the hand or with a hand-held or pedal-operated stick or beater, or by shaking, including drums, cymbals, xylophones, gongs, bells, and rattles." },
    { word: "Perennially", definition: "In a way that continues for a long or apparently infinite time; permanently." },
    { word: "Perfidy", definition: "Deceitfulness; untrustworthiness." },
    { word: "Perforation", definition: "A hole made by boring or piercing; an aperture passing through or into something." },
    { word: "Perform", definition: "Carry out, accomplish, or fulfill (an action, task, or function)." },
    { word: "Performance", definition: "An act of staging or presenting a play, concert, or other form of entertainment." },
    { word: "Perfume", definition: "A fragrant liquid typically made from essential oils extracted from flowers and spices, used to impart a pleasant smell to one's body or clothes." },
    { word: "Perhaps", definition: "Used to express uncertainty or possibility." },
    { word: "Peril", definition: "Serious and immediate danger." },
    { word: "Perimeter", definition: "The continuous line forming the boundary of a closed geometric figure." },
    { word: "Period", definition: "A length or portion of time." },
    { word: "Periodic", definition: "Appearing or occurring at intervals." },
    { word: "Periphery", definition: "The outer limits or edge of an area or object." },
    { word: "Perish", definition: "Suffer death, typically in a violent, sudden, or untimely way." },
    { word: "Perjury", definition: "The offense of willfully telling an untruth or making a misrepresentation under oath." },
    { word: "Permanent", definition: "Lasting or intended to last or remain unchanged indefinitely." },
    { word: "Permeate", definition: "Spread throughout (something); pervade." },
    { word: "Permitting", definition: "Allow the presence of or allow (an activity) without opposing or prohibiting." },
    { word: "Permutation", definition: "The action of changing the arrangement of a set of items." },
    { word: "Pernicious", definition: "Having a harmful effect, especially in a gradual or subtle way." },
    { word: "Perpendicular", definition: "At an angle of 90° to a given line, plane, or surface." },
    { word: "Perpetrate", definition: "Carry out or commit (a harmful, illegal, or immoral action)." },
    { word: "Perpetual", definition: "Never ending or changing." },
    { word: "Perplex", definition: "(of something complicated or unaccountable) cause (someone) to feel completely baffled." },
    { word: "Perquisite", definition: "A benefit which one enjoys or is entitled to on account of one's job or position." },
    { word: "Perry", definition: "A beverage made from fermented pears, similar to cider." },
    { word: "Persecute", definition: "Subject (someone) to hostility and ill-treatment, especially because of their race or political or religious beliefs." },
    { word: "Perseverance", definition: "Persistence in doing something despite difficulty or delay in achieving success." },
    { word: "Persimmon", definition: "An edible fruit that resembles a large tomato and has very sweet flesh." },
    { word: "Persist", definition: "Continue in an opinion or course of action in spite of difficulty or opposition." },
    { word: "Persistent", definition: "Continuing firmly or obstinately in an opinion or course of action in spite of difficulty or opposition." },
    { word: "Perspective", definition: "A particular attitude toward or way of regarding something; a point of view." },
    { word: "Perspicuous", definition: "Clearly expressed and easily understood; lucid." },
    { word: "Persuade", definition: "Cause (someone) to do something through reasoning or argument." },
    { word: "Persuasion", definition: "The action or process of persuading someone or of being persuaded to do or believe something." },
    { word: "Pert", definition: "(of a girl or young woman) attractively lively or cheeky." },
    { word: "Pertain", definition: "Be appropriate, related, or applicable to." },
    { word: "Pertinent", definition: "Relevant or applicable to a particular matter; apposite." },
    { word: "Perturb", definition: "Make (someone) anxious or unsettled." },
    { word: "Peruse", definition: "Read (something), typically in a thorough or careful way." },
    { word: "Pervade", definition: "(especially of a smell) spread through and be perceived in every part of." },
    { word: "Pervasive", definition: "(especially of an unwelcome influence or physical effect) spreading widely throughout an area or a group of people." },
    { word: "Transport", definition: "Take or carry (people or goods) from one place to another by means of a vehicle, aircraft, or ship." },
    { word: "Translucent", definition: "(of a substance) allowing light, but not detailed images, to pass through; semitransparent." },
    { word: "Translate", definition: "Express the meaning of (words or text) in another language." },
    { word: "Transition", definition: "The process or a period of changing from one state or condition to another." },
    { word: "Transcribe", definition: "Put (thoughts, speech, or data) into written or printed form." },
    { word: "Transact", definition: "Conduct or carry out (business)." },
    { word: "Transatlantic", definition: "Crossing or reaching across the Atlantic." },
    { word: "Transcend", definition: "Be or go beyond the range or limits of (a field of activity or conceptual sphere)." },
    { word: "Transcendence", definition: "Existence or experience beyond the normal or physical level." },
    { word: "Transcendental", definition: "Relating to or denoting an a priori concept or idea of pure reason." },
    { word: "Transcontinental", definition: "Crossing a continent." },
    { word: "Transcription", definition: "The action or process of transcribing something." },
    { word: "Transect", definition: "Cut across or make a transverse section in." },
    { word: "Tranquility", definition: "The quality or state of being tranquil; calm." },
    { word: "Transducer", definition: "A device that converts one form of energy to another." },
    { word: "Transduce", definition: "Convert (one form of energy) into another." },
    { word: "Transept", definition: "(in a church) either of the two parts forming the arms of the cross shape, projecting at right angles from the nave." },
    { word: "Transfer", definition: "Move from one place to another." },
    { word: "Transfigure", definition: "Transform into something more beautiful or elevated." },
    { word: "Transfix", definition: "Cause (someone) to become motionless with horror, wonder, or astonishment." },
    { word: "Transform", definition: "Make a thorough or dramatic change in the form, appearance, or character of." },
    { word: "Transformation", definition: "A thorough or dramatic change in form or appearance." },
    { word: "Transformative", definition: "Causing a marked change in someone or something." },
    { word: "Transfuse", definition: "Transfer (blood or its components) from one person or animal to another." },
    { word: "Transfusion", definition: "The action of transfusing blood, blood products, or other fluid into the circulatory system of a person or animal." },
    { word: "Transgenic", definition: "Relating to or denoting an organism that contains genetic material into which DNA from an unrelated organism has been artificially introduced." },
    { word: "Transgress", definition: "Infringe or go beyond the bounds of (a moral principle or other established standard of behavior)." },
    { word: "Transgression", definition: "An act that goes against a law, rule, or code of conduct; an offense." },
    { word: "Transient", definition: "Lasting only for a short time; impermanent." },
    { word: "Transistor", definition: "A semiconductor device with three connections, capable of amplification in addition to rectification." },
    { word: "Transit", definition: "The carrying of people, goods, or materials from one place to another." },
    { word: "Transitional", definition: "Relating to or characteristic of a process or period of transition." },
    { word: "Transitive", definition: "(of a verb or a sense or use of a verb) able to take a direct object (expressed or implied)." },
    { word: "Translucence", definition: "The quality of allowing light, but not detailed images, to pass through; semitransparent." },
    { word: "Translucency", definition: "The quality of being translucent." },
    { word: "Translucent", definition: "Allowing light, but not detailed images, to pass through; semitransparent." },
    { word: "Transmigrate", definition: "Go from one state of existence or place to another." },
    { word: "Transmigration", definition: "The movement of a soul into another body after death." },
    { word: "Transmissible", definition: "Able to be passed on from one person or organism to another." },
    { word: "Transmission", definition: "The action or process of transmitting something or the state of being transmitted." },
    { word: "Transmit", definition: "Cause (something) to pass on from one person or place to another." },
    { word: "Transmitter", definition: "A set of equipment used to generate and transmit electromagnetic waves carrying messages or signals, especially those of radio or television." },
    { word: "Transmute", definition: "Change in form, nature, or substance." },
    { word: "Transnational", definition: "Extending or operating across national boundaries." },
    { word: "Transoceanic", definition: "Situated, occurring, or operating across the ocean." },
    { word: "Transom", definition: "A strengthening crossbar, in particular one set above a window or door." },
    { word: "Transparency", definition: "The condition of being transparent." },
    { word: "Transparent", definition: "(of a material or article) allowing light to pass through so that objects behind can be distinctly seen." },
    { word: "Transpire", definition: "Occur; happen." },
    { word: "Transplant", definition: "Move or transfer (something) to another place or situation, typically with some effort or upheaval." },
    { word: "Transponder", definition: "A device for receiving a radio signal and automatically transmitting a different signal." },
    { word: "Transportation", definition: "The action of transporting someone or something or the process of being transported." },
    { word: "Misplace", definition: "Put in the wrong place and lose temporarily." },
    { word: "Mislead", definition: "Cause (someone) to have a wrong idea or impression about someone or something." },
    { word: "Mission", definition: "An important assignment given to a person or group of people, typically involving travel abroad." },
    { word: "Mismatch", definition: "A failure to correspond or match; a discrepancy." },
    { word: "Misinterpret", definition: "Interpret (something or someone) wrongly." },
    { word: "Misalign", definition: "Place or arrange (things) in a different, incorrect, or inappropriate relative position." },
    { word: "Misalignment", definition: "Incorrect or unsuitable relative position of moving parts or components in a piece of machinery or apparatus." },
    { word: "Misanthrope", definition: "A person who dislikes humankind and avoids human society." },
    { word: "Misanthropic", definition: "Disliking humankind and avoiding human society." },
    { word: "Misapply", definition: "Use (something) in the wrong way or for the wrong purpose." },
    { word: "Misapprehend", definition: "Misunderstand (something)." },
    { word: "Misapprehension", definition: "A mistaken belief about or interpretation of something." },
    { word: "Misappropriate", definition: "Dishonestly or unfairly take (something, especially money, belonging to another) for one's own use." },
    { word: "Misappropriation", definition: "The action of misappropriating something; embezzlement." },
    { word: "Misbegotten", definition: "(of a plan or action) badly conceived, planned, or executed." },
    { word: "Misbehave", definition: "(of a person, especially a child) fail to conduct oneself in a way that is acceptable to others; behave badly." },
    { word: "Misbehavior", definition: "Improper, inappropriate, or bad behavior." },
    { word: "Miscalculate", definition: "Judge or calculate incorrectly." },
    { word: "Miscalculation", definition: "A mistake in planning something or in estimating something, especially costs, time, or effects." },
    { word: "Miscarriage", definition: "An unsuccessful outcome of something planned." },
    { word: "Mischaracterize", definition: "Describe or represent (someone or something) inaccurately." },
    { word: "Miscellaneous", definition: "(of items or people gathered or considered together) of various types or from different sources." },
    { word: "Miscellany", definition: "A group or collection of different items; a mixture." },
    { word: "Mischance", definition: "Bad luck or an unlucky occurrence." },
    { word: "Mischief", definition: "Playful misbehavior or troublemaking, especially in children." },
    { word: "Mischievous", definition: "Causing or showing a fondness for causing trouble in a playful way." },
    { word: "Misclassify", definition: "Classify (something) incorrectly." },
    { word: "Miscommunication", definition: "Failure to communicate adequately." },
    { word: "Misconceive", definition: "Form a mistaken idea about something or someone." },
    { word: "Misconception", definition: "A view or opinion that is incorrect because it is based on faulty thinking or understanding." },
    { word: "Misconduct", definition: "Unacceptable or improper behavior, especially by an employee or professional person." },
    { word: "Misconstrue", definition: "Interpret (something, especially a person's words or actions) wrongly." },
    { word: "Miscount", definition: "Count inaccurately." },
    { word: "Miscreant", definition: "A person who behaves badly or in a way that breaks the law." },
    { word: "Misdate", definition: "Assign a wrong date to (a document)." },
    { word: "Misdeal", definition: "Deal (cards) wrongly." },
    { word: "Misdeed", definition: "A wicked or illegal act." },
    { word: "Misdemeanor", definition: "A minor wrongdoing." },
    { word: "Misdiagnose", definition: "Diagnose (an illness or condition) incorrectly." },
    { word: "Misdiagnosis", definition: "A wrong diagnosis." },
    { word: "Misdirect", definition: "Direct or address (someone or something) wrongly." },
    { word: "Misdirection", definition: "Wrong or incorrect direction, guidance, or instruction." },
    { word: "Misdo", definition: "Do something badly or wrongly." },
    { word: "Miser", definition: "A person who hoards wealth and spends as little money as possible." },
    { word: "Miserable", definition: "(of a person) wretchedly unhappy or uncomfortable." },
    { word: "Misery", definition: "A state or feeling of great distress or discomfort of mind or body." },
    { word: "Misestimate", definition: "An estimate that is incorrect." },
    { word: "Misfeasance", definition: "A transgression, especially the wrongful exercise of lawful authority." },
    { word: "Misfire", definition: "(of a plan or attempt) fail to produce the intended result." },
    { word: "Misfit", definition: "A person whose behavior or attitude sets them apart from others in an uncomfortably conspicuous way." },
    { word: "Misfortune", definition: "Bad luck." },
    { word: "Misgiving", definition: "A feeling of doubt or apprehension about the outcome or consequences of something." },
    { word: "Misguide", definition: "Give someone wrong information or advice." },
    { word: "Mishandle", definition: "Manage or deal with (something) badly or ineffectively." },
    { word: "Mishap", definition: "An unlucky accident." },
    { word: "Mishear", definition: "Fail to hear (something) correctly." },
    { word: "Mishit", definition: "(in sport) hit (a ball) inaccurately or clumsily." },
    { word: "Mishmash", definition: "A confused mixture." },
    { word: "Misidentify", definition: "Identify (someone or something) incorrectly." },
    { word: "Misinform", definition: "Give (someone) false or inaccurate information." },
    { word: "Misinterpretation", definition: "The action of misinterpreting something or the state of being misinterpreted." },
    { word: "Misjudge", definition: "Form a wrong opinion or conclusion about." },
    { word: "Misjudgment", definition: "A wrong or unfair decision or opinion formed unfairly or incorrectly." },
    { word: "Miskick", definition: "A kick that does not go where the player intended." },
    { word: "Mislay", definition: "Lose (something) temporarily by forgetting where one has placed it." },    { word: "Theology", definition: "The study of the nature of God and religious belief." },
    { word: "Theorize", definition: "Form a theory or theories about something based on available data." },
    { word: "Theorem", definition: "A general proposition not self-evident but proved by a chain of reasoning; a truth established by means of accepted truths." },
    { word: "Gorgeous", definition: "Beautiful; very attractive." },
    { word: "Gorilla", definition: "A large, tree-dwelling ape with a black coat and a typically stocky frame, native to the forests of central Sub-Saharan Africa." },
    { word: "Gorge", definition: "Eat a large amount greedily; fill oneself with food." },
    { word: "Hetaera", definition: "A woman in ancient Greece who was a companion or concubine, especially one of high status or intellect." },
    { word: "Heterodox", definition: "Not conforming with accepted or orthodox standards or beliefs." },
    { word: "Heterogeneous", definition: "Diverse in character or content." },  { word: "Gormandize", definition: "Eat greedily or ravenously." },
    { word: "Gorget", definition: "A piece of armor protecting the throat." },
    { word: "Gormless", definition: "Lacking intelligence; stupid." },  { word: "Haberdashery", definition: "A store selling men's clothing and accessories." },
  { word: "Quintessential", definition: "Representing the most perfect or typical example of a quality or class." },
  { word: "Yen", definition: "A deep longing or desire; often, an intense or overwhelming craving." },
    { word: "Zealot", definition: "A person who is fanatical and uncompromising in pursuit of their religious, political, or other ideals." },  { word: "Hacienda", definition: "A large estate or plantation with a dwelling house." },
    { word: "Haggard", definition: "Looking exhausted and unwell, especially from fatigue, worry, or suffering." },
    { word: "Halcyon", definition: "Denoting a period of time in the past that was idyllically happy and peaceful." },
    { word: "Hallowed", definition: "Made holy; consecrated." },
    { word: "Harangue", definition: "A lengthy and aggressive speech." },
    { word: "Harbinger", definition: "A person or thing that announces or signals the approach of another." },
    { word: "Hardy", definition: "Capable of enduring difficult conditions; robust." },
    { word: "Harmonious", definition: "Free from disagreement or dissent." },
    { word: "Harrowing", definition: "Acutely distressing." },    { word: "Quandary", definition: "A state of perplexity or uncertainty over what to do in a difficult situation." },
    { word: "Quantify", definition: "Express or measure the quantity of." },
    { word: "Quarantine", definition: "A state, period, or place of isolation in which people or animals that have arrived from elsewhere or been exposed to infectious or contagious disease are placed." },
    { word: "Quarry", definition: "A place, typically a large, deep pit, from which stone or other materials are or have been extracted." },
    { word: "Quash", definition: "Reject or void, especially by legal procedure." },
    { word: "Quell", definition: "Put an end to (a rebellion or other disorder), typically by the use of force." },
    { word: "Querulous", definition: "Complaining in a petulant or whining manner." },
    { word: "Query", definition: "A question, especially one addressed to an official or organization." },
    { word: "Queue", definition: "A line or sequence of people or vehicles awaiting their turn to be attended to or to proceed." },   { word: "Yell", definition: "To shout something or make a loud noise, typically in pain, anger, or excitement." },
    { word: "Yearn", definition: "Have an intense feeling of longing for something, typically something that one has lost or been separated from." },
    { word: "Yeoman", definition: "A servant in a royal or noble household, ranking between a sergeant and a groom or a squire and a page." },
    { word: "Yeast", definition: "A microscopic fungus consisting of single oval cells that reproduce by budding, and capable of converting sugar into alcohol and carbon dioxide." },
    { word: "Yeasty", definition: "Resembling or containing yeast; frothy." },
    { word: "Yellow", definition: "Of the color between green and orange in the spectrum, a primary subtractive color complementary to blue; colored like ripe lemons or egg yolks." },
    { word: "Yew", definition: "A coniferous tree that has red berrylike fruits, and most parts of which are highly poisonous." },
    { word: "Yeti", definition: "A large hairy creature resembling a human or bear, said to live in the highest part of the Himalayas." },
    { word: "Yelp", definition: "A short, sharp cry, especially of pain or alarm." }
];

const words = vocabulary.map( word => word.word.toUpperCase());
const defs = vocabulary.map (definition => definition.definition);

let index = Math.floor(Math.random() * words.length);
let word = words[index];
let def = defs[index];
let currentLength = 0;
let score = 0;
let gameInterval; // Declare gameInterval in the global scope

document.getElementById('playButton').addEventListener('click', function() {
    this.style.display = 'none'; // Hide the play button
    snake.changeDirection('Right');
    setup(); // Start the game

});


(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    gameInterval = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        displayScore();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            if (currentLength < word.length) {
                currentLength++;
            }

            score += 5;
        }

        if (snake.checkWallCollision()) {
            gameOver();
        }

        snake.checkCollision();
    }, 250);
}());

function displayScore() {
    const scoreElement = document.getElementById('scoreDisplay');
    scoreElement.innerText = "Score: " + score;
}

function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over! You hit the wall. Your score: " + score);
    setTimeout(() => window.location.reload(), 3000); 
}

function gameOverSnake() {
    clearInterval(gameInterval); // Now it should correctly reference the interval
    alert("Game Over! You hit yourself. Your score: " + score);
    setTimeout(() => window.location.reload(), 3000); // Delay before restarting the game
}

function checkGuess(guess) {
    if (guess.toUpperCase() === word.toUpperCase()) {
        score += 50;
        showPopup("Correct! The word was " + word + ". Score: " + score);
       
    } else {
        showPopup("Wrong guess. Try again!");
    }
}

function restartGame() {
    clearInterval(gameInterval); 
    setup();
    isPaused = false; 
    gameLoop(); // Start the game loop again
}



function showPopup(message) {
    const popup = document.getElementById('gamePopup');
    const messageElement = document.getElementById('popupMessage');
    messageElement.textContent = message;
    popup.style.display = 'block';
}

function hidePopup() {
    const popup = document.getElementById('gamePopup');
    popup.style.display = 'none';
}





document.getElementById('playButton').addEventListener('click', function() {
    isPaused = false;
});



function Snake() {
    this.x = scale * 5;
    this.y = scale * 5;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 1;
    this.tail = [{x: this.x, y: this.y}];

    this.draw = function() {
     let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "limegreen");
    gradient.addColorStop(1, "darkgreen");

    for (let i = 0; i < this.tail.length; i++) {
        if (i === 0) {
            // Draw the head with a green background
            ctx.fillStyle = gradient;  // This color should match the start of the body gradient
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
            ctx.drawImage(headImg, this.tail[i].x, this.tail[i].y, scale + 20, scale + 20);
        } else {
            // Draw the body with the gradient
            ctx.fillStyle = gradient;
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);

            // Start adding letters from index 1
            if (i < word.length + 1 && i > 0) {
                ctx.fillStyle = 'white'; // Text color that contrasts with the body
                ctx.fillText(word[i-1], this.tail[i].x + 5, this.tail[i].y + scale / 2 + 5);
            }
        }
    }
    };

    this.update = function() {
 if (this.xSpeed !== 0 || this.ySpeed !== 0) {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = {x: this.x, y: this.y};
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Now handled within the game loop check
     } };

    this.checkWallCollision = function() {
        if (this.x >= canvas.width || this.x < 0 || this.y >= canvas.height || this.y < 0) {
            return true; // Collision occurred
        }
        return false;
    };

    this.changeDirection = function(direction) {
        switch (direction) {
            
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale;
                    this.ySpeed = 0;
                }
                break;
        }
    };

    window.addEventListener('keydown', (evt) => {
        if (evt.key === "ArrowUp" && snake.ySpeed === 0) {
            snake.changeDirection(0, -scale);
        } else if (evt.key === "ArrowDown" && snake.ySpeed === 0) {
            snake.changeDirection(0, scale);
        } else if (evt.key === "ArrowLeft" && snake.xSpeed === 0) {
            snake.changeDirection(-scale, 0);
        } else if (evt.key === "ArrowRight" && snake.xSpeed === 0) {
            snake.changeDirection(scale, 0);
        }
    });

    this.checkCollision = function() {
        for (let i = 1; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 1;
                this.tail = [{x: this.x, y: this.y}];
                currentLength = 1; // Reset to the start of the word
                word = words[Math.floor(Math.random() * words.length)];
                gameOverSnake();
            }
        }
    };

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    };
}

let fruitImg = new Image();
fruitImg.src = 'apple.png';
function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * (columns - 1)) + 1) * scale;
        this.y = (Math.floor(Math.random() * (rows - 1)) + 1) * scale;
    };

    this.draw = function() {
ctx.drawImage(fruitImg, this.x - 10, this.y - 10, scale + 20, scale + 20);
    };
}

function startNewRound() {
    word = words[Math.floor(Math.random() * words.length)];
    snake = new Snake();
    fruit.pickLocation();
    currentLength = 0;
    unhideHintButton();
    hideHintDisplay();

}



window.addEventListener('keydown', (evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);

    if (evt.key === 'Enter') {
        let guess = prompt("What is your guess for the word?");
        if (guess.toUpperCase() === word) {
            alert("Correct! The word was " + word);
           startNewRound(); // Restart the game
           score += 50;
        } else {
            alert("Wrong guess. Try again!");
        }
    }
});

function gameLoop() {
    if (!isPaused) {
        update(); // Handle all update logic
        drawGame();   // Handle all drawing logic
    } else {
        displayPausedState(); // Show paused game state
    }
    requestAnimationFrame(gameLoop);
}


function drawGame() {
    // Drawing the game elements normally
    fruit.draw();
    snake.draw();
    displayScore();
}

function displayPausedState() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText("Game Paused", canvas.width / 2 - 70, canvas.height / 2);
    ctx.restore();
}


document.getElementById('hintButton').addEventListener('click', function() {

  //  let word = words[index]; // Get the random word
    let def = defs[index]; // Get the corresponding definition
    showHint(def); 
    hideHintButton(); 
});

function showHint(def) {

    const hintElement = document.getElementById('hintDisplay');

    hintElement.textContent = `Definition: ${def}`;
    score -= 3;
 
}

function hideHintButton() {
    const hintButton = document.getElementById('hintButton');
    hintButton.style.display = 'none'; 
    
  
}

function hideHintDisplay(){
     const hintElement = document.getElementById('hintDisplay');

    hintElement.textContent = `Hint will be diplayed here`;


}
function unhideHintButton(){

    const hintButton = document.getElementById('hintButton');
    const hintDisplay = document.getElementById('hintDisplay');
    hintButton.style.display = 'inline-block';
    hintDisplay.style.display = 'inline-block'; // Display the hint button as flex
 // Move the hint display to the right by 250px
}