import { useState, useMemo } from "react";

const LEVELS = [
  { label: "Accessible", emoji: "♿", color: "#22C55E" },
  { label: "Easy Peasy", emoji: "👶", color: "#4ADE80" },
  { label: "Kid Friendly", emoji: "🧒", color: "#FACC15" },
  { label: "Moderate", emoji: "🥾", color: "#FB923C" },
  { label: "Adventurous", emoji: "⚡", color: "#F97316" },
  { label: "Send It", emoji: "🤘", color: "#EF4444" },
];

const REGIONS = {
  pisgah: { name: "Pisgah / Brevard", lat: 35.29, lng: -82.68, elev: "2200-5700ft" },
  avl: { name: "Asheville / BRP", lat: 35.60, lng: -82.55, elev: "2000-6684ft" },
  boone: { name: "Boone / High Country", lat: 36.22, lng: -81.67, elev: "3000-5964ft" },
  nantahala: { name: "Nantahala / Bryson City", lat: 35.43, lng: -83.45, elev: "1700-5500ft" },
  uwharrie: { name: "Uwharrie / Albemarle", lat: 35.42, lng: -80.07, elev: "400-1000ft" },
  gorge: { name: "Linville Gorge / Morganton", lat: 35.89, lng: -81.92, elev: "1500-4000ft" },
  hotsprings: { name: "Hot Springs / Max Patch", lat: 35.89, lng: -82.83, elev: "1300-4629ft" },
  lakejames: { name: "Lake James / Nebo", lat: 35.73, lng: -81.89, elev: "1200-2500ft" },
  oldfort: { name: "Old Fort / Black Mtn", lat: 35.63, lng: -82.17, elev: "1400-6684ft" },
  sc_coast: { name: "SC Coast", lat: 33.68, lng: -78.88, elev: "Sea level" },
  sc_up: { name: "SC Upstate / Table Rock", lat: 35.02, lng: -82.72, elev: "800-3500ft" },
  crowders: { name: "Crowders / Kings Mtn", lat: 35.21, lng: -81.29, elev: "800-1700ft" },
  green: { name: "Green River / Saluda", lat: 35.25, lng: -82.33, elev: "1000-3000ft" },
  maggie: { name: "Maggie Valley / Smokies", lat: 35.52, lng: -83.10, elev: "3000-6643ft" },
  stonemtn: { name: "Stone Mtn / Sparta", lat: 36.39, lng: -81.03, elev: "1500-2500ft" },
  lakelure: { name: "Lake Lure / Chimney Rock", lat: 35.43, lng: -82.20, elev: "1000-2480ft" },
  charlotte: { name: "Charlotte Metro", lat: 35.23, lng: -80.84, elev: "600-1000ft" },
};

const BASES = [
  { name: "Charlotte", lat: 35.23, lng: -80.84 },
  { name: "Banner Elk", lat: 36.16, lng: -81.87, near: ["boone"] },
  { name: "Brevard", lat: 35.23, lng: -82.73, near: ["pisgah"] },
  { name: "Asheville", lat: 35.60, lng: -82.55, near: ["avl", "pisgah"] },
  { name: "Bryson City", lat: 35.43, lng: -83.45, near: ["nantahala"] },
  { name: "Boone", lat: 36.22, lng: -81.67, near: ["boone"] },
];

const ACTS = [
  { id: "mtb", label: "MTB", icon: "🚵", color: "#F97316" },
  { id: "hike", label: "Hiking", icon: "🥾", color: "#22C55E" },
  { id: "kayak", label: "Whitewater", icon: "🛶", color: "#3B82F6" },
  { id: "fish", label: "Fishing", icon: "🎣", color: "#8B5CF6" },
  { id: "ski", label: "Skiing", icon: "⛷️", color: "#60A5FA" },
  { id: "run", label: "Trail Run", icon: "🏃", color: "#EF4444" },
  { id: "cycle", label: "Cycling", icon: "🚴", color: "#EAB308" },
  { id: "camp", label: "Camping", icon: "🏕️", color: "#10B981" },
  { id: "swim", label: "Swimming", icon: "🏊", color: "#06B6D4" },
];

const SPOTS = [
  // ━━━ PISGAH / BREVARD (8 spots) ━━━
  { id:1, name:"Bent Creek", reg:"pisgah",
    acts:[
      {type:"mtb",al:3,note:"Explorer Loop (beginner), Green's Lick & Ingles Field (advanced). 30+ mi.",mo:[1,2,3,4,5,9,10,11,12],trail:[{x:12,y:65,n:"Hardtimes TH"},{x:30,y:42,n:"Explorer Loop"},{x:52,y:22,n:"Ingles Field"},{x:72,y:35,n:"Green's Lick"},{x:88,y:58,n:"Bent Creek Gap"}],link:"Trailforks"},
      {type:"hike",al:1,note:"Homestead Trail - flat gravel, stroller-friendly. 2.5mi.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},
      {type:"run",al:3,note:"Explorer + Sidehill = 8mi flowy singletrack.",mo:[1,2,3,4,5,9,10,11,12]},
    ],
    stays:[{icon:"🛻",name:"FR 479 Creek Site",free:true,info:{scenery:"★★★★",tip:"Arrive Fri before 4pm."}},{icon:"⛺",name:"Lake Powhatan CG",price:"$24",info:{toilets:"Flush",showers:"Hot (free)",tip:"Swim beach. Open Apr-Oct."}}],
    tags:["old-growth","creek","dog-friendly"],tips:"Weekends packed by 9am.",cell:"Decent at TH",combos:[{id:2,note:"Davidson River 15min"},{id:4,note:"DuPont 25min"}]},
  { id:2, name:"Davidson River", reg:"pisgah",
    acts:[
      {type:"fish",al:2,note:"Delayed harvest Oct-Jun. Easy wading. Hatchery section best for kids.",mo:[1,2,3,4,5,10,11,12],trail:[{x:10,y:28,n:"Hatchery"},{x:32,y:40,n:"Bridge Pool"},{x:58,y:52,n:"CG Run"},{x:82,y:65,n:"DH End"}],link:"NCWRC"},
      {type:"swim",al:1,note:"Swimming holes near CG. Gentle current.",mo:[5,6,7,8,9]},
      {type:"hike",al:1,note:"Art Loeb Spur - short waterfall walks.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},
    ],
    river:{name:"Davidson River",cfs:142,trend:"stable",status:"ideal",ideal:[80,350]},
    stays:[{icon:"⛺",name:"Davidson River CG",price:"$24",info:{toilets:"Flush",showers:"Coin-op",bestSites:[{n:"A31",w:"Directly on river."},{n:"C3",w:"Walk-in. Most secluded."}],tip:"Year-round. Best USFS CG in Pisgah."}}],
    tags:["trout","stocked","swimming-hole"],tips:"Hatchery below bridge best for kids.",cell:"Good at CG",combos:[{id:1,note:"Bent Creek 15min"},{id:4,note:"DuPont 20min"}]},
  { id:3, name:"Pisgah Ranger District", reg:"pisgah",
    acts:[
      {type:"mtb",al:5,note:"Black Mountain Trail - steep tech, long descent, rock gardens. 8.4mi. THE Pisgah test piece.",mo:[3,4,5,9,10,11],trail:[{x:10,y:20,n:"Ranger Station"},{x:30,y:35,n:"Clawhammer"},{x:55,y:55,n:"Black Mtn"},{x:80,y:70,n:"Sycamore Cove"}],link:"Trailforks"},
      {type:"mtb",al:4,note:"Bennett Gap + Avery Creek. Fast, chunky, technical. Classic Pisgah.",mo:[3,4,5,9,10,11]},
      {type:"mtb",al:4,note:"Butter Gap Trail - technical DH past Daniel Ridge Falls. New reroute is fantastic.",mo:[1,2,3,4,5,9,10,11,12]},
      {type:"hike",al:3,note:"Daniel Ridge Falls - 4mi loop to 150ft waterfall.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},
      {type:"hike",al:2,note:"Looking Glass Falls - roadside 60ft waterfall. 0mi walk.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},
    ],
    stays:[{icon:"🛻",name:"Dispersed FS roads",free:true,info:{tip:"FR 475, 477. No facilities."}},{icon:"🏠",name:"Pilot Cove Lodging",price:"$150-300",info:{tip:"Cabins in Pisgah. Walk to trails."}}],
    tags:["gnar","technical","expert-mtb","waterfall"],tips:"Pisgah is rough, raw, steep. The Hub in Brevard for rentals.",cell:"Limited"},
  { id:4, name:"DuPont State Forest", reg:"pisgah",
    acts:[
      {type:"mtb",al:3,note:"Ridgeline to Airstrip to Braddock. Best flow in the area.",mo:[1,2,3,4,5,9,10,11,12],trail:[{x:10,y:60,n:"Guion Farm"},{x:35,y:40,n:"Airstrip"},{x:60,y:20,n:"Ridgeline"},{x:85,y:50,n:"Braddock"}],link:"Trailforks"},
      {type:"mtb",al:2,note:"Cedar Rock + Big Rock - ride across granite slickrock domes. Unique.",mo:[1,2,3,4,5,9,10,11,12]},
      {type:"hike",al:0,note:"Triple & Hooker Falls - paved/gravel. Wheelchair accessible.",mo:[1,2,3,4,5,6,7,8,9,10,11,12],trail:[{x:15,y:70,n:"Hooker Falls TH"},{x:35,y:55,n:"Hooker Falls"},{x:58,y:38,n:"Triple Falls"},{x:80,y:25,n:"High Falls"}]},
      {type:"run",al:2,note:"Fawn Lake to Ridgeline. Rolling, good footing.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},
    ],
    stays:[{icon:"🏩",name:"Inn at Brevard",price:"$180-280",info:{tip:"Historic B&B downtown."}},{icon:"🏠",name:"Brevard Cabins",price:"$100-250",info:{tip:"Creek access & hot tubs."}}],
    tags:["waterfall","accessible","flow-trails","slickrock"],tips:"Hooker Falls swim hole in summer. Parking fills 10am weekends.",cell:"Good",combos:[{id:2,note:"Davidson River 20min"}]},
  { id:5, name:"North Mills River", reg:"pisgah",
    acts:[
      {type:"mtb",al:4,note:"Spencer Branch + Fletcher Creek + Lower Trace Ridge. Best mix of gnar and flow in Pisgah.",mo:[2,3,4,5,9,10,11]},
      {type:"swim",al:1,note:"Swimming hole at parking. Cold but amazing post-ride.",mo:[5,6,7,8,9]},
    ],
    stays:[{icon:"⛺",name:"North Mills River CG",price:"$18",info:{tip:"At trail base. No cell service."}},{icon:"🛻",name:"Yellow Gap Rd dispersed",free:true,info:{tip:"Popular with MTB crowd."}}],
    tags:["flow","swimming-hole","local-favorite"],tips:"Favorite of AVL locals. Swimming hole is the reward.",cell:"None"},
  { id:6, name:"Bracken Mountain", reg:"pisgah",
    acts:[{type:"mtb",al:3,note:"6mi loop. Climb is legit but descent is one of the flowiest in Pisgah.",mo:[1,2,3,4,5,9,10,11,12]},{type:"run",al:3,note:"Same loop, great for trail running.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["close-to-town","flow-descent"],tips:"Walking distance from downtown Brevard.",cell:"Good"},
  { id:7, name:"Ride Kanuga", reg:"pisgah",
    acts:[{type:"mtb",al:2,note:"Private bike park. Progressive trails, jumps, pump tracks. E-bike friendly. Great for learning.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["bike-park","progressive","e-bike","lessons"],tips:"$20-30 day pass. Loam Pass accepted. Family-friendly.",cell:"Good"},
  { id:8, name:"Sliding Rock", reg:"pisgah",
    acts:[{type:"swim",al:1,note:"60ft natural rock waterslide into pool. $4 admission. Lifeguards summer.",mo:[5,6,7,8,9]}],
    tags:["waterslide","natural","iconic","family"],tips:"Water is 50-60°F even in summer. Go early - line gets long.",cell:"Spotty"},

  // ━━━ ASHEVILLE / BRP (7 spots) ━━━
  { id:9, name:"Craggy Gardens", reg:"avl",
    acts:[{type:"hike",al:2,note:"Craggy Pinnacle - 0.9mi to 360° views. Best panoramic near AVL.",mo:[4,5,6,7,8,9,10]},{type:"hike",al:1,note:"Craggy Gardens Trail - 1.9mi rhododendron tunnels. Peak bloom mid-June.",mo:[5,6,7,8,9]}],
    tags:["panoramic","rhododendron","BRP"],tips:"Rhododendrons peak mid-June. BRP weather changes fast.",cell:"None on BRP"},
  { id:10, name:"French Broad (AVL float)", reg:"avl",
    acts:[{type:"kayak",al:1,note:"Lazy float through Asheville. Class I. Tubes, kayaks, SUP.",mo:[5,6,7,8,9]},{type:"fish",al:2,note:"Smallmouth bass, musky. Wade or float.",mo:[3,4,5,6,7,8,9,10,11]},{type:"cycle",al:2,note:"French Broad Greenway - paved, flat, 7+ mi.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    river:{name:"French Broad",cfs:2100,trend:"stable",status:"ideal",ideal:[800,4000]},
    stays:[{icon:"🏕️",name:"French Broad River CG",price:"$30",info:{tip:"On the river. Paddle to breweries."}}],
    tags:["urban-paddle","brewery","family-float"],tips:"Zen Tubing for rentals. Combine with brewery crawl.",cell:"Good"},
  { id:11, name:"French Broad (Hot Springs WW)", reg:"avl",
    acts:[{type:"kayak",al:3,note:"Class II-III through Pisgah NF. 8mi. Frank Bell's rapid crux.",mo:[3,4,5,6,7,8,9,10]},{type:"kayak",al:4,note:"Full run Class II-IV at high water. Pillow Rock, Stackhouse.",mo:[3,4,5]}],
    river:{name:"French Broad",cfs:2100,trend:"stable",status:"ideal",ideal:[800,4000]},
    stays:[{icon:"🏨",name:"Hot Springs Resort & Spa",price:"$100-200",info:{tip:"Natural hot springs on the AT."}}],
    tags:["whitewater","big-water"],tips:"NOC runs commercial trips. Hot Springs town is charming. Soak after.",cell:"Spotty"},
  { id:12, name:"Black Balsam Knob", reg:"avl",
    acts:[{type:"hike",al:2,note:"Art Loeb Trail to bald summit. 360° views. Wildflower meadows. 1.5mi to summit.",mo:[4,5,6,7,8,9,10]},{type:"run",al:3,note:"Art Loeb out to Tennent Mtn. Exposed ridgeline running.",mo:[5,6,7,8,9,10]}],
    tags:["bald","360-views","wildflower","BRP"],tips:"One of the best sunset spots in WNC. Can be windy/cold at elevation.",cell:"None"},
  { id:13, name:"Kolo Bike Park", reg:"avl",
    acts:[{type:"mtb",al:2,note:"125 acres, 4mi purpose-built trails, jump lines, 2 pump tracks, skills park. Near downtown AVL.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["bike-park","jumps","pump-track","urban"],tips:"Open year-round. Rentals and lessons on-site. Great for progression.",cell:"Full"},
  { id:14, name:"Nolichucky Gorge", reg:"avl",
    acts:[{type:"kayak",al:4,note:"Class II-IV. 25+ named rapids. Remote wilderness gorge. 8mi run.",mo:[3,4,5,6,7,8,9]}],
    river:{name:"Nolichucky River",cfs:640,trend:"stable",status:"ideal",ideal:[400,2000]},
    tags:["gorge","remote","wilderness"],tips:"One of wildest gorges in the East. NOC runs guided trips.",cell:"None"},
  { id:15, name:"Pigeon River", reg:"avl",
    acts:[{type:"kayak",al:3,note:"Upper Pigeon: Class III-IV. Powerhouse, Roller Coaster, Lost Guide. Dam-release.",mo:[4,5,6,7,8,9,10]},{type:"kayak",al:1,note:"Lower Pigeon: Class I-II. Family-friendly float near Hartford.",mo:[5,6,7,8,9]}],
    river:{name:"Pigeon River",cfs:520,trend:"stable",status:"ideal",ideal:[300,1500]},
    tags:["dam-release","family-option","hartford"],tips:"Upper is real whitewater. Lower great for families. Multiple outfitters in Hartford.",cell:"OK"},

  // ━━━ BOONE / HIGH COUNTRY (8 spots) ━━━
  { id:16, name:"Sugar Mountain", reg:"boone",
    acts:[{type:"ski",al:2,note:"Largest in NC. 125 acres, 20 slopes. 1200ft vertical. Lessons age 4+.",mo:[12,1,2,3]},{type:"ski",al:4,note:"Upper Big Birch - only double black in NC.",mo:[12,1,2,3]},{type:"mtb",al:3,note:"Summer lift-served MTB. Growing trail system.",mo:[6,7,8,9,10]}],
    stays:[{icon:"🏨",name:"Sugar Ski & Country Club",price:"$150-300",info:{tip:"Ski-in/ski-out."}},{icon:"🏠",name:"Banner Elk Cabins",price:"$100-250",info:{tip:"10min to slopes."}}],
    tags:["ski-resort","biggest-NC","lessons"],tips:"Midweek dramatically less crowded. Night skiing Fri/Sat.",cell:"Good"},
  { id:17, name:"Beech Mountain", reg:"boone",
    acts:[{type:"ski",al:2,note:"Highest ski area in eastern US (5506ft). 17 trails, 95 acres. 5506' Skybar at summit.",mo:[12,1,2,3]},{type:"ski",al:3,note:"Upper mountain steeps and terrain park.",mo:[12,1,2,3]},{type:"mtb",al:3,note:"Beech Mtn bike park - lift-served. Emerging system.",mo:[6,7,8,9,10]}],
    stays:[{icon:"🏠",name:"Beech Mtn cabins",price:"$100-250",info:{tip:"Alpine village vibe. Brewery at base."}}],
    tags:["highest-east","skybar","alpine"],tips:"Skybar at summit is unique experience. Beech Mtn Brewing Co at base.",cell:"Good"},
  { id:18, name:"Appalachian Ski Mtn", reg:"boone",
    acts:[{type:"ski",al:1,note:"Best for beginners. French Swiss Ski College taught 1M+ people. 12 slopes, ice rink.",mo:[12,1,2,3]}],
    stays:[{icon:"🏠",name:"Blowing Rock rentals",price:"$100-250",info:{tip:"8mi from slopes. Charming town."}}],
    tags:["beginner","ski-school","ice-skating","family"],tips:"Best snow-making in NC. Great for first-timers. Terrain parks for freestyle.",cell:"Good"},
  { id:19, name:"Watauga River", reg:"boone",
    acts:[{type:"kayak",al:5,note:"Gorge: Class III-IV. Hydro Falls must be scouted. Committing.",mo:[2,3,4,5]},{type:"fish",al:2,note:"Valle Crucis - easy bank access, stocked + wild trout.",mo:[3,4,5,9,10,11]},{type:"kayak",al:1,note:"Flatwater near Valle Crucis. SUP or canoe. Scenic.",mo:[5,6,7,8]}],
    river:{name:"Watauga River",cfs:320,trend:"falling",status:"ideal",ideal:[200,800]},
    tags:["gorge","wild-trout","college-town"],tips:"Gorge is committing. Valle Crucis great for family fishing.",cell:"Good in town"},
  { id:20, name:"Rough Ridge", reg:"boone",
    acts:[{type:"hike",al:2,note:"1.5mi to spectacular rock outcrop. Views of Grandfather Mtn & Linn Cove Viaduct.",mo:[4,5,6,7,8,9,10],trail:[{x:10,y:60,n:"BRP Parking"},{x:40,y:35,n:"Boardwalk"},{x:70,y:15,n:"Rough Ridge"},{x:90,y:30,n:"Summit"}]}],
    stays:[{icon:"⛺",name:"Julian Price CG",price:"$22",info:{tip:"On BRP. Beautiful Price Lake sites."}}],
    tags:["views","BRP","iconic"],tips:"Sunrise is magical. Go early or weekday.",cell:"None on BRP"},
  { id:21, name:"Grandfather Mountain", reg:"boone",
    acts:[{type:"hike",al:4,note:"Profile Trail - 3.3mi, 2000ft gain. Ladders, cables, scramble.",mo:[5,6,7,8,9,10]},{type:"hike",al:1,note:"Mile High Swinging Bridge - paved paths. $24 admission.",mo:[4,5,6,7,8,9,10,11]}],
    tags:["scramble","ladders","iconic"],tips:"Profile Trail is legit. Not for heights-averse.",cell:"On summit"},
  { id:22, name:"Elk Knob", reg:"boone",
    acts:[{type:"hike",al:3,note:"Summit Trail - 3.8mi RT to 5520ft. Views of Mt Rogers (VA).",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"ski",al:2,note:"Cross-country skiing when snow hits.",mo:[12,1,2]}],
    tags:["state-park","summit","xc-ski"],tips:"Less crowded than Grandfather. No fee.",cell:"Spotty"},
  { id:23, name:"Boone Fork Trail", reg:"boone",
    acts:[{type:"hike",al:3,note:"5mi loop at Julian Price Park. Hebron Falls, creek crossings, diverse terrain. Part of Tanawha.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["waterfall","loop","creek-crossings","BRP"],tips:"Multiple creek crossings - waterproof boots helpful. Kid-friendly TRACK trail first mile.",cell:"None"},

  // ━━━ NANTAHALA / BRYSON CITY (5 spots) ━━━
  { id:24, name:"Nantahala River", reg:"nantahala",
    acts:[{type:"kayak",al:3,note:"Class II-III. Dam-release year-round. 8mi. Nantahala Falls = crux. 45°F water!",mo:[1,2,3,4,5,6,7,8,9,10,11,12],trail:[{x:8,y:20,n:"Put-in"},{x:30,y:35,n:"Surfing Wave"},{x:60,y:55,n:"Nantahala Falls"},{x:85,y:68,n:"NOC"}],link:"Am. Whitewater"},{type:"kayak",al:5,note:"Cascades section: Class IV-V. Expert only. Limited releases.",mo:[2,3,4,5]},{type:"fish",al:3,note:"Trophy trout below dam. Cold, technical nymphing.",mo:[1,2,3,4,5,10,11,12]}],
    river:{name:"Nantahala River",cfs:680,trend:"rising",status:"ideal",ideal:[400,1200]},
    stays:[{icon:"⛺",name:"Tsali CG",price:"$20",info:{bestSites:[{n:"4",w:"Fontana Lake sunset view."}],tip:"Open Apr-Oct."}},{icon:"🚗",name:"NOC Parking",free:true,info:{tip:"Paddlers sleep in cars. Tolerated."}}],
    tags:["whitewater","dam-release","cold-water"],tips:"Wetsuit required year-round. NOC has everything.",cell:"Poor"},
  { id:25, name:"Tsali MTB", reg:"nantahala",
    acts:[{type:"mtb",al:2,note:"4 loops - Right, Left, Mouse, Thompson. Flowy, non-tech. Fontana Lake views. 40+ mi.",mo:[1,2,3,4,5,6,7,8,9,10,11,12],trail:[{x:10,y:55,n:"Tsali TH"},{x:30,y:30,n:"Right Loop"},{x:55,y:15,n:"Lake view"},{x:80,y:40,n:"Mouse Branch"}]}],
    stays:[{icon:"⛺",name:"Tsali CG",price:"$20",info:{tip:"Right at trailhead."}}],
    tags:["beginner-mtb","lake-views","historic"],tips:"Alternating bike/horse days - check schedule! Right Loop best for beginners.",cell:"Spotty"},
  { id:26, name:"Deep Creek (Smokies)", reg:"nantahala",
    acts:[{type:"hike",al:2,note:"3 waterfalls loop - Tom Branch, Indian Creek, Juney Whank. 2.5mi.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:1,note:"Tubing on Deep Creek. Gentle, cold, fun for all ages.",mo:[6,7,8]}],
    stays:[{icon:"⛺",name:"Deep Creek CG",price:"$25",info:{tip:"Walk to falls and tubing from camp."}}],
    tags:["waterfall","tubing","smokies","family"],tips:"Rent tubes in Bryson City. Creek is cold.",cell:"None"},
  { id:27, name:"Tuckasegee River", reg:"nantahala",
    acts:[{type:"kayak",al:1,note:"Gentle Class I-II float through Dillsboro. Great family float.",mo:[4,5,6,7,8,9,10]},{type:"fish",al:2,note:"Delayed harvest section. Stocked trout. Easy wade access.",mo:[1,2,3,4,5,10,11,12]}],
    river:{name:"Tuckasegee River",cfs:450,trend:"stable",status:"ideal",ideal:[200,1000]},
    tags:["family-float","trout","dillsboro"],tips:"Dillsboro is cute. Good post-float restaurants.",cell:"Good"},
  { id:28, name:"Fire Mountain (Cherokee)", reg:"nantahala",
    acts:[{type:"mtb",al:3,note:"Flow trails with Cherokee cultural elements. Berms, jumps. Well-maintained. Growing system.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["flow-trails","cultural","progressive"],tips:"On Cherokee tribal land. Combines great riding with Native American history.",cell:"Good"},

  // ━━━ LINVILLE GORGE / MORGANTON (3 spots) ━━━
  { id:29, name:"Linville Gorge", reg:"gorge",
    acts:[{type:"hike",al:4,note:"Table Rock - 2.2mi to summit. Rocky scramble. Insane gorge views.",mo:[1,2,3,4,5,6,7,8,9,10,11,12],trail:[{x:15,y:65,n:"Table Rock TH"},{x:45,y:35,n:"Ridge"},{x:75,y:10,n:"Summit"}]},{type:"hike",al:5,note:"Gorge Trail to river - steep, primitive, 1800ft drop. Wilderness permit weekends.",mo:[3,4,5,9,10,11]},{type:"hike",al:2,note:"Linville Falls - 1.6mi to overlooks of 90ft falls.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    stays:[{icon:"🛻",name:"Kistler Hwy dispersed",free:true,info:{scenery:"★★★★★",tip:"Permit required Fri-Sun May-Oct."}}],
    tags:["gorge","wilderness","scramble","iconic"],tips:"Permit needed weekends May-Oct. Table Rock sunrise legendary.",cell:"None"},
  { id:30, name:"Wilson Creek", reg:"gorge",
    acts:[{type:"kayak",al:5,note:"Class IV-V steep creek. Drops, slides, must-make moves. Expert only.",mo:[11,12,1,2,3,4]},{type:"swim",al:2,note:"Swimming holes throughout. Sliding rock areas.",mo:[5,6,7,8,9]},{type:"fish",al:3,note:"Wild trout upper sections. Freestone stream.",mo:[3,4,5,6,9,10,11]}],
    river:{name:"Wilson Creek",cfs:88,trend:"stable",status:"low",ideal:[100,400]},
    tags:["steep-creek","swimming-holes","wild-trout"],tips:"Levels change fast after rain. Special place.",cell:"None"},
  { id:31, name:"Hawksbill Mountain", reg:"gorge",
    acts:[{type:"hike",al:3,note:"1.4mi to highest peak on Linville Gorge east rim. 360° views. Less crowded than Table Rock.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["summit","less-crowded","gorge-views"],tips:"Great alternative to Table Rock if you want solitude.",cell:"None"},

  // ━━━ OLD FORT / BLACK MTN (3 spots) ━━━
  { id:32, name:"Old Fort Gateway Trails", reg:"oldfort",
    acts:[{type:"mtb",al:2,note:"14mi flowy beginner-friendly trails (28 more under construction). Rare easy riding in WNC.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["beginner-mtb","flow","new-trails"],tips:"Brand new 2024. G5 Trail Collective built. 25min from Asheville.",cell:"Good"},
  { id:33, name:"Kitsuma / Heartbreak Ridge", reg:"oldfort",
    acts:[{type:"mtb",al:4,note:"Kitsuma: fast, flowy, famous. Heartbreak Ridge: relentless climb, epic DH reward.",mo:[3,4,5,9,10,11]},{type:"hike",al:3,note:"Point Lookout Trail to Kitsuma overlook. Views of gorge.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["famous-descent","shuttle","old-fort"],tips:"Many shuttle Kitsuma. Heartbreak earns its name on the climb.",cell:"Spotty"},
  { id:34, name:"Mt Mitchell", reg:"oldfort",
    acts:[{type:"hike",al:3,note:"Highest peak east of Mississippi (6684ft). Drive to summit or hike Mt Mitchell Trail (5.6mi, 3700ft gain).",mo:[5,6,7,8,9,10]},{type:"run",al:5,note:"Mt Mitchell Challenge race route. Brutal but legendary.",mo:[5,6,7,8,9]}],
    tags:["highest-east","summit","epic"],tips:"Drive-up summit has observation deck. Trail from Black Mtn CG is serious.",cell:"At summit"},

  // ━━━ HOT SPRINGS / MAX PATCH (1 spot) ━━━
  { id:35, name:"Max Patch", reg:"hotsprings",
    acts:[{type:"hike",al:1,note:"1.4mi to bald summit. 360° views. Part of the AT. Best sunset hike in WNC.",mo:[3,4,5,6,7,8,9,10,11],trail:[{x:15,y:60,n:"Parking"},{x:45,y:35,n:"AT junction"},{x:75,y:10,n:"Summit"}]}],
    stays:[{icon:"🏨",name:"Hot Springs Resort",price:"$100-200",info:{tip:"Natural hot springs on the AT."}}],
    tags:["sunset","bald","AT","panoramic","iconic"],tips:"No camping ON Max Patch. Clear day essential.",cell:"None"},

  // ━━━ GREEN RIVER (1 spot) ━━━
  { id:36, name:"Green River", reg:"green",
    acts:[{type:"kayak",al:5,note:"Green River Narrows - Class V. 11 major rapids. Most famous steep creek in SE.",mo:[10,11,12,1,2,3,4]},{type:"kayak",al:2,note:"Lower Green - Class I-II. Mellow gorge float. Family-friendly.",mo:[4,5,6,7,8,9,10]},{type:"kayak",al:3,note:"Upper Green - Class III. Fun intermediate. Rodeo waves.",mo:[4,5,6,7,8,9,10]}],
    river:{name:"Green River",cfs:210,trend:"stable",status:"ideal",ideal:[150,600]},
    tags:["steep-creek","narrows","legendary"],tips:"Green Race every November. Narrows is bucket-list paddling.",cell:"Spotty"},

  // ━━━ LAKE LURE / CHIMNEY ROCK (2 spots) ━━━
  { id:37, name:"Chimney Rock", reg:"lakelure",
    acts:[{type:"hike",al:2,note:"Trail to Chimney Rock + Hickory Nut Falls (400ft). Multiple trail options. Admission req.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"hike",al:4,note:"Four Seasons Trail - challenging, less crowded. Great views.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["chimney","waterfall","gorge-views","admission"],tips:"$17 admission. Elevator to chimney or hike. Last of the Mohicans filmed here.",cell:"Good"},
  { id:38, name:"Lake Lure / Buffalo Creek", reg:"lakelure",
    acts:[{type:"mtb",al:3,note:"Buffalo Creek Park - 3.5mi loop climbing through boulders. Growing system.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:1,note:"Lake Lure beach and boat rentals. Clean mountain lake.",mo:[5,6,7,8,9]},{type:"kayak",al:0,note:"Flatwater paddling on Lake Lure. Rentals available. Scenic.",mo:[4,5,6,7,8,9,10]}],
    tags:["lake","beach","mountain-lake","dirty-dancing"],tips:"Dirty Dancing filmed here. Flowering Bridge is cool stop.",cell:"Good"},

  // ━━━ MAGGIE VALLEY / SMOKIES (2 spots) ━━━
  { id:39, name:"Cataloochee Ski Area", reg:"maggie",
    acts:[{type:"ski",al:1,note:"First ski area in NC (1961). 18 slopes, 50 acres. Great for beginners. Free senior skiing.",mo:[11,12,1,2,3]}],
    stays:[{icon:"🏠",name:"Maggie Valley lodging",price:"$80-180",info:{tip:"Charming valley. 35mi from Asheville."}}],
    tags:["ski-resort","beginner","historic","seniors-free"],tips:"100% snowmaking. Good value. Closest ski to Asheville.",cell:"Good"},
  { id:40, name:"Cataloochee Valley (Elk)", reg:"maggie",
    acts:[{type:"hike",al:1,note:"Elk viewing in restored valley. Easy walks among historic buildings.",mo:[9,10,11,12,1,2]},{type:"hike",al:3,note:"Boogerman Trail - 7.4mi loop through old-growth forest. Remote feel.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["elk","old-growth","historic","smokies"],tips:"Best elk viewing at dawn/dusk Sept-Oct. Bugling season. Gravel road access.",cell:"None"},

  // ━━━ STONE MTN / SPARTA (1 spot) ━━━
  { id:41, name:"Stone Mountain SP", reg:"stonemtn",
    acts:[{type:"hike",al:3,note:"Stone Mountain Loop - 4.5mi. Summit the granite dome, 200ft waterfall, homestead. Great variety.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"fish",al:2,note:"Stocked trout streams in park. Easy access.",mo:[3,4,5,6,7,8,9,10,11]}],
    stays:[{icon:"⛺",name:"Stone Mtn CG",price:"$20-28",info:{tip:"State park. Well-maintained."}}],
    tags:["granite-dome","waterfall","homestead","state-park"],tips:"The loop is one of the best hikes in NC. Good for kids 8+.",cell:"Spotty"},

  // ━━━ UWHARRIE (3 spots) ━━━
  { id:42, name:"Uwharrie NF", reg:"uwharrie",
    acts:[{type:"mtb",al:4,note:"Wood Run Trail - rocky, rooty, technical Piedmont riding. 22mi system.",mo:[1,2,3,4,10,11,12],trail:[{x:10,y:55,n:"Wood Run TH"},{x:28,y:30,n:"Rocky ridge"},{x:50,y:18,n:"Creek"},{x:72,y:28,n:"Rock garden"},{x:88,y:55,n:"Return"}],link:"Trailforks"},{type:"hike",al:3,note:"Uwharrie Trail - 20mi or out-and-backs from Jumping Off Rock.",mo:[1,2,3,4,10,11,12]}],
    stays:[{icon:"⛺",name:"Badin Lake CG",price:"$12",info:{toilets:"Pit",bestSites:[{n:"5",w:"Lake view."},{n:"8",w:"Most private."}],tip:"First-come. Lake swimming."}},{icon:"🛻",name:"FR 576 Creekside",free:true,info:{scenery:"★★★★",tip:"Best dispersed near Uwharrie."}}],
    tags:["rocky","technical","lake","close-to-CLT"],tips:"Best in cooler months. Badin Lake post-ride swim.",cell:"Spotty"},
  { id:43, name:"Morrow Mountain SP", reg:"uwharrie",
    acts:[{type:"hike",al:2,note:"Summit Trail + Falls Trail. River views. Easy-moderate.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"fish",al:1,note:"Lake Tillery access. Bass, catfish.",mo:[3,4,5,6,7,8,9,10,11]},{type:"swim",al:1,note:"Pool open Memorial Day to Labor Day.",mo:[6,7,8]}],
    stays:[{icon:"⛺",name:"Morrow Mtn CG",price:"$20-35",info:{tip:"Well-maintained. Cabins available."}}],
    tags:["state-park","family","close-to-CLT"],tips:"50mi east of Charlotte. Good family option.",cell:"Good"},
  { id:44, name:"Badin Lake", reg:"uwharrie",
    acts:[{type:"swim",al:1,note:"Clear lake swimming at Badin Lake beaches. No lifeguard.",mo:[5,6,7,8,9]},{type:"fish",al:2,note:"Bass, crappie, catfish. Boat ramp at CG.",mo:[3,4,5,6,7,8,9,10,11]},{type:"kayak",al:0,note:"Flatwater lake paddling. Scenic coves. Bald eagle sightings.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["lake","swimming","bass-fishing"],tips:"Combine with Uwharrie MTB for a perfect weekend.",cell:"Spotty"},

  // ━━━ CROWDERS / KINGS MTN (3 spots) ━━━
  { id:45, name:"Crowders Mountain", reg:"crowders",
    acts:[{type:"hike",al:2,note:"Crowders Mtn Trail - 1.8mi to summit. Charlotte skyline views.",mo:[1,2,3,4,5,6,7,8,9,10,11,12],trail:[{x:10,y:65,n:"Visitor Center"},{x:40,y:35,n:"Ridgeline"},{x:70,y:10,n:"Summit"}]},{type:"hike",al:3,note:"Kings Pinnacle - 3.5mi to higher peak. Views of both summits.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"run",al:3,note:"Ridgeline trail connecting peaks. 7mi+ loops.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["close-to-CLT","quick-hike","views","state-park"],tips:"30min from Charlotte. Perfect after-work hike.",cell:"Good"},
  { id:46, name:"USNWC (Whitewater Center)", reg:"crowders",
    acts:[{type:"kayak",al:2,note:"Man-made whitewater. Class II-IV options. Year-round, rain-independent.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"mtb",al:3,note:"25+ mi singletrack. Flowy, well-maintained. Night riding.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"run",al:2,note:"Trail running on MTB network. Races throughout year.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["man-made","year-round","charlotte"],tips:"Day pass ~$59. Beer garden. Best outdoor day near CLT.",cell:"Full"},
  { id:47, name:"Kings Mountain SP", reg:"crowders",
    acts:[{type:"hike",al:2,note:"16mi trail system. Revolutionary War battlefield. Rolling Piedmont woods.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"run",al:2,note:"Good trail running on variety of surfaces.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["history","revolutionary-war","state-park"],tips:"Revolutionary War battlefield. National Military Park adjacent.",cell:"Good"},

  // ━━━ CHARLOTTE METRO (2 spots) ━━━
  { id:48, name:"Anne Springs Close Greenway", reg:"charlotte",
    acts:[{type:"mtb",al:2,note:"25+ mi trails. Rolling, non-technical. Good variety. Well-maintained.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"hike",al:1,note:"Easy trails through meadows and woods. Dog-friendly.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"cycle",al:1,note:"Paved greenway sections. Family-friendly.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["close-to-CLT","dog-friendly","family"],tips:"Membership or day pass. Good after-work option in Fort Mill.",cell:"Full"},
  { id:49, name:"Colonel Francis Beatty Park", reg:"charlotte",
    acts:[{type:"mtb",al:2,note:"Beatty Park + Cross Charlotte Trail. Local MTB in south Charlotte.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["urban-mtb","close-to-CLT","quick-ride"],tips:"Quick ride option. Not destination riding but good for locals.",cell:"Full"},

  // ━━━ LAKE JAMES (1 spot) ━━━
  { id:50, name:"Lake James SP", reg:"lakejames",
    acts:[{type:"mtb",al:3,note:"25+ mi including Overmountain Victory Trail. Views of Linville Gorge.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"hike",al:1,note:"Sandy Beach Trail - flat, easy, beach at end.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:0,note:"Paddy's Creek beach. Lifeguards summer. Sandy, clear.",mo:[5,6,7,8,9]}],
    stays:[{icon:"⛺",name:"Lake James CG",price:"$22-33",info:{toilets:"Flush",showers:"Yes",bestSites:[{n:"Walk-in waterfront",w:"Right on lake. Book 6mo ahead."}],tip:"Cabins available."}}],
    tags:["lake","beach","mtb","state-park"],tips:"Waterfront walk-in sites are the prize. Book as soon as window opens.",cell:"Decent"},

  // ━━━ SC UPSTATE (3 spots) ━━━
  { id:51, name:"Chattooga River", reg:"sc_up",
    acts:[{type:"kayak",al:3,note:"Section III: Class II-III. Bull Sluice (IV) at end. Wild & Scenic.",mo:[3,4,5,6,7,8,9,10]},{type:"kayak",al:5,note:"Section IV: Class IV+. Five Falls. Seven Foot Falls. Epic.",mo:[3,4,5]},{type:"hike",al:2,note:"Chattooga River Trail - follow river upstream. Remote.",mo:[3,4,5,6,7,8,9,10,11]}],
    river:{name:"Chattooga River",cfs:380,trend:"rising",status:"ideal",ideal:[200,800]},
    stays:[{icon:"🛻",name:"Dispersed along Chattooga",free:true,info:{tip:"Remote. Sumter NF."}}],
    tags:["wild-scenic","deliverance","remote"],tips:"Section IV is world-class. NOC runs trips.",cell:"None on river"},
  { id:52, name:"Table Rock SP (SC)", reg:"sc_up",
    acts:[{type:"hike",al:4,note:"Table Rock Summit - 3.6mi, 2000ft gain. Demanding. Incredible views.",mo:[1,2,3,4,5,9,10,11,12],trail:[{x:10,y:70,n:"Nature Center"},{x:35,y:45,n:"Governors Rock"},{x:60,y:25,n:"Ridge"},{x:85,y:8,n:"Summit"}]},{type:"hike",al:1,note:"Carrick Creek - 2mi loop, waterfall. Easy.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:0,note:"Lake Oolenoy beach. Open summer.",mo:[5,6,7,8,9]}],
    stays:[{icon:"⛺",name:"Table Rock SP CG",price:"$16-22",info:{tip:"Beautiful park. Cabins available. Book ahead fall."}}],
    tags:["summit","lake","state-park","SC"],tips:"Fall foliage rivals anywhere in SE.",cell:"At visitor center"},
  { id:53, name:"Paris Mountain SP", reg:"sc_up",
    acts:[{type:"mtb",al:2,note:"13mi trail system. Good intermediate riding near Greenville.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"hike",al:1,note:"Lake Placid Trail + Sulphur Springs. Easy loops.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:0,note:"Lake Placid swimming area. Open summer.",mo:[6,7,8]}],
    tags:["state-park","greenville","mtb","lake"],tips:"Near downtown Greenville SC. Good local riding.",cell:"Good"},

  // ━━━ SC COAST (5 spots) ━━━
  { id:54, name:"Myrtle Beach / Grand Strand", reg:"sc_coast",
    acts:[{type:"fish",al:1,note:"Surf fishing - red drum, flounder, pompano. Piers year-round.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"swim",al:0,note:"60 miles of beach. Lifeguards in summer.",mo:[5,6,7,8,9]},{type:"kayak",al:1,note:"Waccamaw River black water. Spanish moss, cypress, gators.",mo:[3,4,5,6,7,8,9,10]}],
    stays:[{icon:"🏨",name:"MB Hotels",price:"$60-200",info:{tip:"Off-season = great value."}},{icon:"⛺",name:"Myrtle Beach SP",price:"$25-35",info:{tip:"Oceanfront. Reserve way ahead summer."}}],
    tags:["beach","surf-fishing","family"],tips:"Spring/fall fewer crowds. Waccamaw River is the hidden gem.",cell:"Full"},
  { id:55, name:"Murrells Inlet / Pawleys", reg:"sc_coast",
    acts:[{type:"kayak",al:1,note:"Salt marsh kayaking. Calm estuary. Birds, crabs, dolphins.",mo:[3,4,5,6,7,8,9,10,11]},{type:"fish",al:2,note:"Inshore - redfish, speckled trout, flounder.",mo:[3,4,5,6,7,8,9,10,11]}],
    stays:[{icon:"🏠",name:"Pawleys Island",price:"$100-300",info:{tip:"Arrogantly shabby. Quieter than Myrtle."}}],
    tags:["salt-marsh","dolphins","quiet-beach"],tips:"MarshWalk for dining. Sunset kayaking is incredible.",cell:"Good"},
  { id:56, name:"Charleston Coast", reg:"sc_coast",
    acts:[{type:"kayak",al:1,note:"Folly Beach salt marsh. Morris Island Lighthouse paddle.",mo:[3,4,5,6,7,8,9,10,11]},{type:"fish",al:2,note:"Inshore charters. Bull reds in fall.",mo:[3,4,5,6,7,8,9,10,11]},{type:"cycle",al:1,note:"Kiawah Island - 30+ mi paved paths through maritime forest.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    stays:[{icon:"🏠",name:"Folly Beach rentals",price:"$100-250",info:{tip:"Funky beach town. Better vibe than Kiawah."}}],
    tags:["cycling","salt-marsh","charleston"],tips:"Folly is the locals' beach. Better vibe, more affordable.",cell:"Good"},
  { id:57, name:"Congaree National Park", reg:"sc_coast",
    acts:[{type:"kayak",al:1,note:"Paddle through old-growth floodplain forest. Guided ranger tours or DIY. Unique.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"hike",al:1,note:"Boardwalk Loop - 2.4mi elevated walkway through tallest trees in eastern US.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["national-park","old-growth","floodplain","unique"],tips:"Synchronous fireflies in late May! Lottery required. Mosquitoes legendary.",cell:"At visitor center"},
  { id:58, name:"ACE Basin", reg:"sc_coast",
    acts:[{type:"kayak",al:1,note:"250-mile Edisto River black water. Pristine cypress swamps. Largest undeveloped wetland on Atlantic coast.",mo:[3,4,5,6,7,8,9,10,11]},{type:"fish",al:2,note:"Inshore fishing in massive estuary. Redfish, trout.",mo:[4,5,6,7,8,9,10]}],
    tags:["black-water","pristine","wildlife-refuge"],tips:"Carolina Heritage Outfitters has treehouse rentals on river. Bucket-list experience.",cell:"Spotty"},

  // ━━━ ADDITIONAL NOTABLE SPOTS ━━━
  { id:59, name:"Cheoah River", reg:"nantahala",
    acts:[{type:"kayak",al:5,note:"Class IV-V. The Fugitive was filmed here. Limited scheduled releases. Bear Creek Falls = crux.",mo:[3,4,10,11]}],
    river:{name:"Cheoah River",cfs:0,trend:"n/a",status:"low",ideal:[200,600]},
    tags:["class-V","release-only","remote","fugitive"],tips:"Only runs on scheduled releases. Check TVA schedule. Expert only.",cell:"None"},
  { id:60, name:"Ocoee River (TN border)", reg:"nantahala",
    acts:[{type:"kayak",al:3,note:"Middle Ocoee: Class III-IV. 1996 Olympic course. Dam-release. Reliable.",mo:[4,5,6,7,8,9,10]},{type:"kayak",al:4,note:"Upper Ocoee: Olympic section. Class III-IV+. Bigger water.",mo:[4,5,6,7,8,9]}],
    tags:["olympic","dam-release","reliable"],tips:"Just over TN border. Reliable dam-release = always runnable. Multiple outfitters.",cell:"OK at put-in"},
  { id:61, name:"Sapphire Valley Ski", reg:"pisgah",
    acts:[{type:"ski",al:1,note:"Tiny beginner slope near Cashiers. 1 run. Good for very first timers.",mo:[12,1,2,3]}],
    tags:["tiny","beginner-only","cashiers"],tips:"Southernmost ski in NC. More of a snow play area. Tubing and zip line too.",cell:"Good"},
  { id:62, name:"Hatley Pointe (Wolf Ridge)", reg:"avl",
    acts:[{type:"ski",al:2,note:"54 acres, 15 slopes near Mars Hill. 30min from Asheville. Under new ownership with upgrades.",mo:[12,1,2,3]}],
    tags:["ski-resort","closest-to-AVL","upgrading"],tips:"Formerly Wolf Ridge. New owners investing. Closest ski to Asheville.",cell:"Good"},
  { id:63, name:"Jackrabbit Mountain", reg:"nantahala",
    acts:[{type:"mtb",al:2,note:"Best beginner MTB system near Hayesville. Smooth flow. Gets people hooked on riding.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["beginner-mtb","flow","hayesville"],tips:"If you want someone to fall in love with MTB, take them here.",cell:"Good"},
  { id:64, name:"South Mountains SP", reg:"crowders",
    acts:[{type:"mtb",al:3,note:"18mi system near Morganton. Rocky Piedmont-style riding.",mo:[1,2,3,4,5,9,10,11,12]},{type:"hike",al:3,note:"High Shoals Falls - 2.7mi RT to 80ft waterfall. Rocky descent.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    stays:[{icon:"⛺",name:"South Mountains CG",price:"$20-28",info:{tip:"Equestrian + standard sites. State park."}}],
    tags:["waterfall","mtb","state-park"],tips:"1hr from Charlotte. Good waterfall hike + MTB combo day.",cell:"Spotty"},
  { id:65, name:"Cane Creek Park (Charlotte)", reg:"charlotte",
    acts:[{type:"mtb",al:2,note:"6mi of trails near Waxhaw. Good local riding. Expanding.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]},{type:"fish",al:1,note:"Stocked pond fishing. Good for kids.",mo:[3,4,5,6,7,8,9,10,11]}],
    tags:["local-riding","close-to-CLT","union-county"],tips:"20min south of Charlotte. After-work option.",cell:"Full"},
];

const RIVERS = {
  davidson: { name: "Davidson River", cfs: 142, trend: "stable", status: "ideal" },
  nantahala: { name: "Nantahala River", cfs: 680, trend: "rising", status: "ideal" },
  watauga: { name: "Watauga River", cfs: 320, trend: "falling", status: "ideal" },
  wilson: { name: "Wilson Creek", cfs: 88, trend: "stable", status: "low" },
  french: { name: "French Broad", cfs: 2100, trend: "stable", status: "ideal" },
  green: { name: "Green River", cfs: 210, trend: "stable", status: "ideal" },
  chattooga: { name: "Chattooga River", cfs: 380, trend: "rising", status: "ideal" },
  nolichucky: { name: "Nolichucky River", cfs: 640, trend: "stable", status: "ideal" },
  pigeon: { name: "Pigeon River", cfs: 520, trend: "stable", status: "ideal" },
  cheoah: { name: "Cheoah River", cfs: 0, trend: "n/a", status: "low" },
  tuck: { name: "Tuckasegee River", cfs: 450, trend: "stable", status: "ideal" },
};

const TRAIL_COND = [
  { name: "Bent Creek", st: "Dry", c: "green" },
  { name: "DuPont", st: "Dry", c: "green" },
  { name: "Pisgah (high)", st: "Muddy", c: "red" },
  { name: "Uwharrie", st: "Tacky", c: "yellow" },
  { name: "Tsali", st: "Dry", c: "green" },
  { name: "USNWC", st: "Open", c: "green" },
  { name: "Crowders", st: "Dry", c: "green" },
  { name: "Lake James", st: "Dry", c: "green" },
  { name: "Old Fort Gateway", st: "Dry", c: "green" },
  { name: "Kolo Bike Park", st: "Open", c: "green" },
  // ━━━ TROUT WATERS ━━━
  // DELAYED HARVEST STREAMS (C&R Oct-Jun, keep 7/day Jun-Sep)
  { id:66, name:"South Fork New River (DH)", reg:"boone",
    acts:[{type:"fish",al:2,note:"DH stream in Todd. Easy wade access. Scenic valley. Stocked 5x/yr.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","stocked","todd"],tips:"C&R single-hook artificials Oct-Jun. Open harvest Jun-Sep. Mast General Store in Valle Crucis nearby.",cell:"Good"},
  { id:67, name:"Elk Creek (DH)", reg:"boone",
    acts:[{type:"fish",al:2,note:"Upper & Lower DH sections in Watauga Co. Good access on Leatherwood Mtns.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","watauga"],tips:"Two separate DH sections. Check NCWRC map for exact boundaries.",cell:"Spotty"},
  { id:68, name:"Big Horse Creek (DH)", reg:"boone",
    acts:[{type:"fish",al:2,note:"DH stream in Ashe Co near Lansing. Remote, beautiful freestone. Less pressured.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","less-crowded","ashe"],tips:"Less crowded than Valle Crucis area streams. Worth the drive.",cell:"Spotty"},
  { id:69, name:"Wilson Creek (DH)", reg:"gorge",
    acts:[{type:"fish",al:3,note:"DH section from game lands to Phillips Branch. Beautiful gorge. Technical wading.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","gorge","wilson-creek"],tips:"Same gorge as the kayaking. Rocky wading - felt soles help. Wild trout in upper tributaries too.",cell:"None"},
  { id:70, name:"Jacob Fork Creek (DH)", reg:"crowders",
    acts:[{type:"fish",al:2,note:"DH at South Mountains SP. Closest DH stream to Charlotte. Shinny Creek confluence.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","close-to-CLT","south-mountains"],tips:"1hr from Charlotte. Combine with High Shoals Falls hike. State park access.",cell:"Spotty"},
  { id:71, name:"Green River (DH)", reg:"green",
    acts:[{type:"fish",al:3,note:"DH from Fishtop Falls to Cove Creek confluence. Beautiful gorge setting. Wild + stocked.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","gorge","green-river"],tips:"Same river as the Narrows kayak run but different section. Game land access.",cell:"Spotty"},
  { id:72, name:"East Fork French Broad (DH)", reg:"pisgah",
    acts:[{type:"fish",al:2,note:"DH from Glady Fork to French Broad. Near Rosman. Easy access, good parking.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","rosman","easy-access"],tips:"Good for beginners - easier wading than Davidson. Near Brevard.",cell:"Good"},
  { id:73, name:"Little River at DuPont (DH)", reg:"pisgah",
    acts:[{type:"fish",al:2,note:"DH from Lake Dense to below Hooker Falls. Fish below the waterfall!",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","dupont","waterfall"],tips:"Unique fishing below Hooker Falls. Combine with DuPont hiking.",cell:"Good"},
  { id:74, name:"Tuckasegee River (DH)", reg:"nantahala",
    acts:[{type:"fish",al:2,note:"DH section near Webster/Dillsboro. Wide river, easy wading. Town access.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","dillsboro","easy-wade"],tips:"Walk from Dillsboro shops to fish. Great lunch-break fishing.",cell:"Good"},
  { id:75, name:"Nantahala River (DH)", reg:"nantahala",
    acts:[{type:"fish",al:3,note:"DH from Whiteoak Creek to powerhouse. Trophy potential. Cold water year-round from dam.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","trophy","cold-water"],tips:"Dam-release keeps water 45-50°F. Fish hold over better here. Trophy browns possible.",cell:"Poor"},
  { id:76, name:"Big Laurel Creek (DH)", reg:"hotsprings",
    acts:[{type:"fish",al:3,note:"DH near Hot Springs. Remote, scenic. Less pressure than Brevard streams.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","hot-springs","remote"],tips:"Combine with Hot Springs soaking. Less crowded than Pisgah area DH streams.",cell:"Spotty"},
  { id:77, name:"Spring Creek (DH)", reg:"hotsprings",
    acts:[{type:"fish",al:2,note:"DH in Hot Springs town. Walk from downtown to stream. Easy access.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","hot-springs","town-access"],tips:"Fish then soak in hot springs. Perfect combo day.",cell:"Good"},
  { id:78, name:"Fires Creek (DH)", reg:"nantahala",
    acts:[{type:"fish",al:3,note:"DH from Rockhouse Creek to USFS picnic area. Remote, beautiful. Chunky water.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","remote","chunky-water"],tips:"Near Hayesville. Less pressured. Fires Creek Rim Trail for hikers.",cell:"None"},
  { id:79, name:"Snowbird Creek (DH)", reg:"nantahala",
    acts:[{type:"fish",al:3,note:"DH on Big Snowbird Creek near Robbinsville. Wilderness feel. Native brookies in tributaries.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","wilderness","brookies"],tips:"Some of the most remote fishing in NC. Worth the drive for solitude.",cell:"None"},
  { id:80, name:"West Fork Pigeon River (DH)", reg:"maggie",
    acts:[{type:"fish",al:2,note:"DH from Queens Creek to Lake Logan. Near Maggie Valley. Good access.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","maggie-valley"],tips:"Near Cataloochee ski area. Good winter fishing + ski combo.",cell:"Spotty"},
  { id:81, name:"North Fork Mills River (DH)", reg:"pisgah",
    acts:[{type:"fish",al:3,note:"DH below Hendersonville watershed dam. Wild feel. Game land access.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","game-land","wild-feel"],tips:"Tributary of Mills River. Combine with North Mills River MTB.",cell:"None"},
  { id:82, name:"Swannanoa River (DH)", reg:"avl",
    acts:[{type:"fish",al:2,note:"DH near Black Mountain. Town access. Easy wading. Good for families.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","black-mountain","easy-access"],tips:"Walk from Black Mountain breweries to fish. Perfect half-day trip from Asheville.",cell:"Good"},
  { id:83, name:"Cane Creek / North Toe (DH)", reg:"oldfort",
    acts:[{type:"fish",al:2,note:"Mountain Heritage Trout Waters near Bakersville/Spruce Pine. Veterans fish free!",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","heritage","veterans-free"],tips:"Mountain Heritage Trout Water = veterans fish free with valid docs. Historic mining towns nearby.",cell:"Good"},
  { id:84, name:"Mill Creek Old Fort (DH)", reg:"oldfort",
    acts:[{type:"fish",al:1,note:"DH in downtown Old Fort. 0.7mi section. Mountain Heritage Trout Town. Free loaner tackle!",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","heritage","free-tackle","beginner"],tips:"Mountain Gateway Museum has free tackle loaner program. Kids under 16 fish free. Perfect intro to fly fishing.",cell:"Good"},
  { id:85, name:"Mitchell River (DH)", reg:"stonemtn",
    acts:[{type:"fish",al:2,note:"DH near Surry Co. Less pressure. Rolling Piedmont setting.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","surry","less-pressure"],tips:"Near Pilot Mountain. One of the easternmost DH streams.",cell:"Good"},
  { id:86, name:"Reddies River (DH)", reg:"stonemtn",
    acts:[{type:"fish",al:2,note:"DH in North Wilkesboro. Town access from water intake dam to Yadkin River.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","north-wilkesboro"],tips:"Town fishing. Good after-work option for Wilkes County residents.",cell:"Good"},
  { id:87, name:"East Prong Roaring River (DH)", reg:"stonemtn",
    acts:[{type:"fish",al:2,note:"DH at Stone Mountain SP. Beautiful park setting. Granite dome backdrop.",mo:[1,2,3,4,5,10,11,12]}],
    tags:["delayed-harvest","trout","stone-mountain","state-park"],tips:"Combine with Stone Mountain Loop hike. Two adventures in one park.",cell:"Spotty"},

  // WILD TROUT / SPECIAL REGULATION WATERS
  { id:88, name:"South Mills River (Wild)", reg:"pisgah",
    acts:[{type:"fish",al:4,note:"Wild trout only. Catch & release, artificial only. Native brookies & wild browns. Remote headwaters.",mo:[3,4,5,6,9,10,11]}],
    tags:["wild-trout","catch-release","native-brookies","remote"],tips:"Hike in required. Turkey Pen TH. Suspension bridges. The real Pisgah experience.",cell:"None"},
  { id:89, name:"Linville River (Wild)", reg:"gorge",
    acts:[{type:"fish",al:5,note:"Wild trout in Linville Gorge Wilderness. Steep descent to river. Trophy browns. Remote.",mo:[3,4,5,6,9,10,11]}],
    tags:["wild-trout","wilderness","trophy-brown","remote","expert"],tips:"Must hike 1800ft down to river. Permit weekends May-Oct. Some of the best wild trout in SE.",cell:"None"},
  { id:90, name:"Catawba River (Special Reg)", reg:"gorge",
    acts:[{type:"fish",al:2,note:"Special reg: 2/day, 14\" min. Near Morganton. Year-round, no closed season.",mo:[1,2,3,4,5,6,7,8,9,10,11,12]}],
    tags:["special-reg","trout","year-round","morganton"],tips:"No closed season. Trophy regulation (14\" min) produces bigger fish.",cell:"Good"},

];

// helpers
function gd(a,b,c,d){const R=3959,dl=(c-a)*Math.PI/180,dn=(d-b)*Math.PI/180,x=Math.sin(dl/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dn/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x))}
function ssn(m){return m>=3&&m<=5?"spring":m>=6&&m<=8?"summer":m>=9&&m<=11?"fall":"winter"}
function wx(r,m){const d={pisgah:{spring:[68,42,30],summer:[82,60,45],fall:[65,40,20],winter:[48,25,25]},avl:{spring:[65,40,35],summer:[80,58,40],fall:[62,38,20],winter:[45,23,30]},boone:{spring:[58,35,35],summer:[75,55,35],fall:[58,35,20],winter:[38,18,40]},nantahala:{spring:[68,42,30],summer:[82,58,35],fall:[65,40,15],winter:[50,28,20]},uwharrie:{spring:[72,48,25],summer:[90,68,30],fall:[70,45,10],winter:[52,30,15]},gorge:{spring:[65,40,30],summer:[80,58,35],fall:[63,38,15],winter:[45,24,25]},hotsprings:{spring:[65,40,30],summer:[82,58,35],fall:[63,38,15],winter:[45,23,25]},lakejames:{spring:[68,44,28],summer:[84,62,35],fall:[66,42,15],winter:[48,28,20]},oldfort:{spring:[66,42,30],summer:[82,60,35],fall:[64,40,18],winter:[46,25,25]},sc_coast:{spring:[74,55,20],summer:[88,72,30],fall:[75,58,15],winter:[58,38,15]},sc_up:{spring:[70,45,28],summer:[86,64,30],fall:[68,44,15],winter:[50,28,18]},crowders:{spring:[72,48,25],summer:[90,68,25],fall:[70,46,10],winter:[52,30,15]},green:{spring:[68,44,28],summer:[84,62,30],fall:[66,42,15],winter:[48,28,20]},maggie:{spring:[62,38,35],summer:[78,56,40],fall:[60,36,18],winter:[42,22,30]},stonemtn:{spring:[62,38,30],summer:[78,56,30],fall:[60,36,15],winter:[40,20,30]},lakelure:{spring:[70,45,28],summer:[86,64,30],fall:[68,44,15],winter:[50,28,18]},charlotte:{spring:[72,48,25],summer:[90,70,25],fall:[72,48,10],winter:[52,32,15]}};const s=ssn(m),v=d[r]?.[s]||[65,40,20];return{hi:v[0],lo:v[1],pr:v[2],ic:{winter:"❄️",spring:"🌤️",summer:"☀️",fall:"🍂"}[s]}}
function dl(ds){
  if(!ds)return"";
  const d=new Date(ds+"T12:00:00");
  const t=new Date();t.setHours(12,0,0,0);
  const diff=Math.round((d-t)/(1000*60*60*24));
  if(diff===0)return"Today";
  if(diff===1)return"Tomorrow";
  if(diff>=2&&diff<=6)return"This "+d.toLocaleDateString("en-US",{weekday:"long"});
  if(diff>=7&&diff<=13)return"Next "+d.toLocaleDateString("en-US",{weekday:"long"});
  return d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
}

// ── Components ──
function LvlBadge({level}){const l=LEVELS[level];if(!l)return null;const r=parseInt(l.color.slice(1,3),16),g=parseInt(l.color.slice(3,5),16),b=parseInt(l.color.slice(5,7),16);return(<span style={{fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:99,backgroundColor:"rgba("+r+","+g+","+b+",0.09)",color:l.color,border:"1px solid rgba("+r+","+g+","+b+",0.19)"}}>{l.emoji} L{level}</span>)}

function StatusBadge({status}){const bg=status==="ideal"?"#10B981":status==="low"?"#F87171":"#FBBF24";return <span style={{fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:99,backgroundColor:bg,color:"white",textTransform:"uppercase"}}>{status}</span>}

function TrailMap({activity}){
  const pts=activity.trail;
  if(!pts||!pts.length) return null;
  const ac=ACTS.find(a=>a.id===activity.type);
  const color=ac?ac.color:"#F59E0B";
  const dash=activity.type==="kayak"||activity.type==="fish";
  const pathD=pts.map((p,i)=>(i===0?"M":"L")+p.x+","+p.y).join(" ");
  return(
    <div style={{width:"100%",borderRadius:12,overflow:"hidden",border:"1px solid #1F2937",background:"#0F1A2B",marginBottom:10}}>
      <svg viewBox="0 0 100 80" style={{width:"100%",display:"block",height:190}}>
        {[15,30,45,60].map(y=><path key={y} d={"M0,"+y+" Q25,"+(y+Math.sin(y*0.1)*6)+" 50,"+(y-Math.cos(y*0.15)*4)+" T100,"+(y+Math.sin(y*0.2)*3)} fill="none" stroke="#1B3044" strokeWidth="0.3"/>)}
        <path d={pathD} fill="none" stroke={color} strokeWidth="3" opacity="0.15" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash?"4,2":"none"}/>
        {pts.map((p,i)=>{const isS=i===0,isE=i===pts.length-1;return(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={isS||isE?3.5:2} fill={isS?"#22C55E":isE?"#EF4444":color} stroke="#0F172A" strokeWidth="1.2"/>
            <text x={p.x} y={p.y-(isS||isE?6:4.5)} textAnchor="middle" fill="#94A3B8" fontSize="3" fontFamily="system-ui" fontWeight="600">{p.n}</text>
          </g>
        )})}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",padding:"4px 10px",borderTop:"1px solid #1F293780"}}>
        <div style={{display:"flex",gap:8,fontSize:9,color:"#6B7280"}}>
          <span>● Start</span><span style={{color:"#EF4444"}}>● End</span>
        </div>
        {activity.link&&<span style={{fontSize:9,color:"#FBBF24",fontWeight:700}}>{activity.link} ↗</span>}
      </div>
    </div>
  );
}

function StayCard({stay}){
  const [open,setOpen]=useState(false);
  const info=stay.info||{};
  return(
    <div style={{borderBottom:"1px solid #1F293750",padding:"8px 0"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>setOpen(!open)}>
        <span style={{fontSize:14}}>{stay.icon}</span>
        <span style={{fontSize:12,fontWeight:700,flex:1,color:"#E5E7EB"}}>{stay.name}</span>
        <span style={{fontSize:10,fontWeight:700,color:stay.free?"#34D399":"#FBBF24"}}>{stay.free?"Free":stay.price}</span>
        <span style={{fontSize:10,color:"#6B7280",marginLeft:4}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <div style={{marginLeft:26,marginTop:6}}>
          {info.scenery&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 12px",marginBottom:6}}>
              {info.scenery&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Scenery: </span><span style={{color:"#D1D5DB"}}>{info.scenery}</span></div>}
              {info.water&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Water: </span><span style={{color:"#D1D5DB"}}>{info.water}</span></div>}
              {info.privacy&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Privacy: </span><span style={{color:"#D1D5DB"}}>{info.privacy}</span></div>}
              {info.surface&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Surface: </span><span style={{color:"#D1D5DB"}}>{info.surface}</span></div>}
              {info.fits&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Fits: </span><span style={{color:"#D1D5DB"}}>{info.fits}</span></div>}
              {info.fire&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Fire ring: </span><span style={{color:"#D1D5DB"}}>{info.fire}</span></div>}
            </div>
          )}
          {info.bestSites&&(
            <div style={{marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",marginBottom:4}}>🏆 Best Sites:</div>
              {info.bestSites.map((bs,j)=>(
                <div key={j} style={{display:"flex",gap:6,marginBottom:4,fontSize:10}}>
                  <span style={{backgroundColor:"rgba(251,191,36,0.2)",color:"#FBBF24",fontWeight:700,padding:"2px 6px",borderRadius:4,flexShrink:0}}>#{bs.n}</span>
                  <span style={{color:"#9CA3AF"}}>{bs.w}</span>
                </div>
              ))}
            </div>
          )}
          {info.toilets&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 12px",marginBottom:4}}>
              <div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Toilets: </span><span style={{color:"#D1D5DB"}}>{info.toilets}</span></div>
              <div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Showers: </span><span style={{color:"#D1D5DB"}}>{info.showers||"None"}</span></div>
              {info.water&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Water: </span><span style={{color:"#D1D5DB"}}>{info.water}</span></div>}
              {info.firewood&&<div style={{fontSize:10}}><span style={{color:"#6B7280"}}>Firewood: </span><span style={{color:"#D1D5DB"}}>{info.firewood}</span></div>}
            </div>
          )}
          {info.store&&<div style={{fontSize:10,marginBottom:4}}><span style={{color:"#6B7280"}}>🏪 Store: </span><span style={{color:"#D1D5DB"}}>{info.store}</span></div>}
          {info.tip&&<div style={{fontSize:10,color:"#6B7280",fontStyle:"italic",marginTop:4,paddingTop:4,borderTop:"1px solid #1F293730"}}>{info.tip}</div>}
        </div>
      )}
    </div>
  );
}

function Nav({v,go}){
  const tabs=[["home","⛰️","Home"],["plan","🗺️","Plan"],["cond","📊","Live"],["spots","📍","Spots"]];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#030712F2",borderTop:"1px solid #1F2937",zIndex:50}}>
      <div style={{maxWidth:448,margin:"0 auto",display:"flex"}}>
        {tabs.map(([id,ic,lb])=>(
          <button key={id} onClick={()=>go(id)} style={{flex:1,padding:"10px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",color:v===id?"#FBBF24":"#4B5563",cursor:"pointer"}}>
            <span style={{fontSize:18}}>{ic}</span>
            <span style={{fontSize:10,fontWeight:600}}>{lb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const B = {background:"#111827",border:"1px solid #1F2937",borderRadius:12};

// ── MAIN APP ──
export default function Ridgeline(){
  const [v,setV]=useState("home");
  const [qDate,setQDate]=useState("this-weekend");
  const [tDate,setTDate]=useState("");
  const [base,setBase]=useState(null);
  const [custLoc,setCustLoc]=useState("");
  const [aRange,setARange]=useState([0,5]);
  const [selActs,setSelActs]=useState([]);
  const [maxDr,setMaxDr]=useState(180);
  const [results,setResults]=useState(null);
  const [spot,setSpot]=useState(null);
  const [actIdx,setActIdx]=useState(0);

  const eDate=useMemo(()=>{
    if(tDate)return tDate;
    const now=new Date();
    const pad=n=>String(n).padStart(2,'0');
    const fmt=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
    if(qDate==="today")return fmt(now);
    if(qDate==="tomorrow"){now.setDate(now.getDate()+1);return fmt(now);}
    if(qDate==="this-weekend"){
      const day=now.getDay();
      if(day===0||day===6)return fmt(now);
      now.setDate(now.getDate()+(6-day));return fmt(now);
    }
    if(qDate==="next-weekend"){
      const day=now.getDay();
      const add=day===0?6:day===6?7:(6-day)+7;
      now.setDate(now.getDate()+add);return fmt(now);
    }
    return fmt(now);
  },[tDate,qDate]);
  const eMo=new Date(eDate+"T12:00:00").getMonth()+1;
  const eSsn=ssn(eMo);
  const sI={spring:"🌸",summer:"☀️",fall:"🍂",winter:"❄️"};
  const sugA={winter:["ski","hike","fish","mtb"],spring:["kayak","mtb","fish","hike"],summer:["swim","camp","mtb"],fall:["mtb","hike","run","cycle","fish"]}[eSsn]||[];
  const tog=id=>setSelActs(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);

  const plan=()=>{
    const bL=base?.lat||35.23;
    const bN=base?.lng||-80.84;
    const filtered=[];
    for(let i=0;i<SPOTS.length;i++){
      const s=SPOTS[i];
      const rg=REGIONS[s.reg];
      if(!rg)continue;
      const dist=gd(bL,bN,rg.lat,rg.lng);
      const dm=Math.round(dist*1.4);
      if(dm>maxDr)continue;
      const fa=s.acts.filter(function(a){
        if(a.al<aRange[0]||a.al>aRange[1])return false;
        if(selActs.length>0&&!selActs.includes(a.type))return false;
        if(a.mo&&!a.mo.includes(eMo))return false;
        return true;
      });
      if(fa.length===0)continue;
      filtered.push({...s,acts:fa,dm:dm});
    }
    filtered.sort(function(a,b){return a.dm-b.dm});
    setResults(filtered);
    setV("res");
  };

  const openSpot=s=>{setSpot(s);setActIdx(0);setV("det")};
  const p={padding:20,maxWidth:448,margin:"0 auto"};

  // HOME
  if(v==="home") return(
    <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
      <div style={p}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <span style={{fontSize:24}}>⛰️</span>
          <h1 style={{fontSize:24,fontWeight:900,margin:0}}>RIDGE<span style={{color:"#FBBF24"}}>LINE</span></h1>
        </div>
        <button onClick={()=>setV("plan")} style={{width:"100%",background:"#F59E0B",color:"#111",fontWeight:700,padding:"16px 0",borderRadius:12,fontSize:18,border:"none",cursor:"pointer",marginBottom:12}}>🗺️ Plan a Trip</button>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
          <button onClick={()=>setV("cond")} style={{...B,padding:"12px 0",fontWeight:600,fontSize:14,color:"#E5E7EB",cursor:"pointer"}}>📊 Conditions</button>
          <button onClick={()=>setV("spots")} style={{...B,padding:"12px 0",fontWeight:600,fontSize:14,color:"#E5E7EB",cursor:"pointer"}}>📍 All Spots</button>
        </div>
        <div style={{...B,padding:12,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Rivers</div>
          {Object.values(RIVERS).map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 0",borderBottom:i<3?"1px solid #1F293740":"none"}}>
              <span style={{fontSize:12,color:"#9CA3AF"}}>{r.name}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:11,fontFamily:"monospace",color:"#6B7280"}}>{r.cfs}cfs</span>
                <StatusBadge status={r.status}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{...B,padding:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Trails</div>
          {TRAIL_COND.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",borderBottom:i<3?"1px solid #1F293740":"none"}}>
              <span style={{width:8,height:8,borderRadius:4,background:t.c==="green"?"#10B981":t.c==="yellow"?"#F59E0B":"#EF4444"}}/>
              <span style={{fontSize:12,color:"#9CA3AF",flex:1}}>{t.name}</span>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:99,color:t.c==="green"?"#34D399":t.c==="yellow"?"#FBBF24":"#F87171",background:t.c==="green"?"#10B98118":t.c==="yellow"?"#F59E0B18":"#EF444418"}}>{t.st}</span>
            </div>
          ))}
        </div>
      </div>
      <Nav v="home" go={setV}/>
    </div>
  );

  // PLANNER
  if(v==="plan") return(
    <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
      <div style={p}>
        <h2 style={{fontSize:24,fontWeight:900,marginBottom:16}}>Plan a Trip</h2>
        <div style={{...B,padding:14,marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>When?</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,marginBottom:8}}>
            {[["today","Today"],["tomorrow","Tmrw"],["this-weekend","This Wknd"],["next-weekend","Next Wknd"]].map(([id,l])=>(
              <button key={id} onClick={()=>{setQDate(id);setTDate("")}} style={{padding:"6px 0",borderRadius:8,fontSize:11,fontWeight:600,border:qDate===id&&!tDate?"1px solid #F59E0B":"1px solid #374151",background:qDate===id&&!tDate?"#F59E0B18":"transparent",color:qDate===id&&!tDate?"#FBBF24":"#9CA3AF",cursor:"pointer"}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:10,color:"#6B7280"}}>Pick:</span>
            <input type="date" value={tDate} onChange={e=>{setTDate(e.target.value);setQDate(null)}} style={{flex:1,background:"#1F2937",border:"1px solid #374151",borderRadius:8,padding:"4px 8px",fontSize:12,color:"#D1D5DB"}}/>
          </div>
          <div style={{marginTop:6,display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:14}}>{sI[eSsn]}</span>
            <span style={{fontSize:10,color:"#6B7280"}}>{dl(eDate)} - {eSsn}</span>
          </div>
        </div>

        <div style={{...B,padding:14,marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Where?</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            {BASES.map(b=>(
              <button key={b.name} onClick={()=>{setBase(b);if(b.near)setMaxDr(60);else setMaxDr(180)}} style={{padding:"4px 8px",borderRadius:99,fontSize:11,fontWeight:600,border:base?.name===b.name?"1px solid #F59E0B":"1px solid #374151",background:base?.name===b.name?"#F59E0B18":"transparent",color:base?.name===b.name?"#FBBF24":"#9CA3AF",cursor:"pointer"}}>{b.name}</button>
            ))}
          </div>
          <div style={{borderTop:"1px solid #374151",paddingTop:8,marginTop:4}}>
            <div style={{fontSize:10,color:"#6B7280",marginBottom:4}}>Or enter a specific address:</div>
            <div style={{display:"flex",gap:6}}>
              <input type="text" placeholder="e.g. 142 Elk River Rd, Banner Elk" value={custLoc} onChange={e=>setCustLoc(e.target.value)} style={{flex:1,background:"#1F2937",border:"1px solid #374151",borderRadius:8,padding:"6px 10px",fontSize:12,color:"#D1D5DB"}}/>
              <button onClick={()=>{if(!custLoc)return;const lc=custLoc.toLowerCase();const m=BASES.find(b=>lc.includes(b.name.toLowerCase()));setBase(m||{name:custLoc,lat:35.5,lng:-82.0})}} style={{background:"#F59E0B",color:"#111",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:700,border:"none",cursor:"pointer"}}>Set</button>
            </div>
            {custLoc&&base?.name===custLoc&&<div style={{fontSize:10,color:"#FBBF24",marginTop:4}}>📍 {custLoc}</div>}
          </div>
          <div style={{marginTop:8}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#6B7280",marginBottom:2}}>
              <span>Max drive</span><span style={{fontWeight:700,color:"#D1D5DB"}}>{maxDr}min ({Math.round(maxDr/60*10)/10}hrs)</span>
            </div>
            <input type="range" min={30} max={300} step={15} value={maxDr} onChange={e=>setMaxDr(+e.target.value)} style={{width:"100%",accentColor:"#F59E0B"}}/>
          </div>
        </div>

        <div style={{...B,padding:14,marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Adventure Level</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <LvlBadge level={aRange[0]}/><span style={{color:"#374151"}}>→</span><LvlBadge level={aRange[1]}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4}}>
            {LEVELS.map((l,i)=>{const inR=i>=aRange[0]&&i<=aRange[1];const rgb=l.color;const r2=parseInt(rgb.slice(1,3),16),g2=parseInt(rgb.slice(3,5),16),b2=parseInt(rgb.slice(5,7),16);return(
              <button key={i} onClick={()=>{if(i<=aRange[0]||(i<aRange[1]&&i<=(aRange[0]+aRange[1])/2))setARange([i,aRange[1]]);else setARange([aRange[0],i])}} style={{padding:"4px 0",borderRadius:8,textAlign:"center",border:inR?"1px solid rgba("+r2+","+g2+","+b2+",0.25)":"1px solid rgba(31,41,55,0.4)",background:inR?"rgba("+r2+","+g2+","+b2+",0.06)":"transparent",cursor:"pointer"}}>
                <div style={{fontSize:14}}>{l.emoji}</div>
                <div style={{fontSize:9,fontWeight:700,color:inR?l.color:"#555"}}>{i}</div>
              </button>
            )})}
          </div>
        </div>

        <div style={{...B,padding:14,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1}}>Activities</div>
            <button onClick={()=>setSelActs(sugA)} style={{fontSize:10,color:"#FBBF24",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>{sI[eSsn]} {eSsn} picks</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
            {ACTS.map(a=>{const sel=selActs.includes(a.id);return(
              <button key={a.id} onClick={()=>tog(a.id)} style={{padding:"6px 4px",borderRadius:8,border:sel?"1px solid #F59E0B":"1px solid #374151",background:sel?"#F59E0B12":"transparent",fontSize:11,textAlign:"center",color:sel?"#FBBF24":"#9CA3AF",cursor:"pointer",fontWeight:600}}>
                {a.icon} {a.label}
              </button>
            )})}
          </div>
        </div>

        <button onClick={plan} style={{width:"100%",background:"#F59E0B",color:"#111",fontWeight:700,padding:"16px 0",borderRadius:12,fontSize:18,border:"none",cursor:"pointer"}}>Find Adventures →</button>
      </div>
      <Nav v="plan" go={setV}/>
    </div>
  );

  // RESULTS
  if(v==="res") return(
    <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
      <div style={p}>
        <button onClick={()=>setV("plan")} style={{fontSize:12,color:"#6B7280",background:"none",border:"none",cursor:"pointer",marginBottom:12}}>← Edit</button>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h2 style={{fontSize:20,fontWeight:900,margin:0}}>{results?.length||0} Spots</h2>
          <span style={{fontSize:10,color:"#6B7280"}}>{dl(eDate)} {sI[eSsn]}</span>
        </div>
        {results?.map(s=>{const rg=REGIONS[s.reg],w=wx(s.reg,eMo);return(
          <div key={s.id} onClick={()=>openSpot(s)} style={{...B,padding:12,marginBottom:8,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>{s.name}</div>
                <div style={{fontSize:10,color:"#6B7280"}}>{rg.name} - {s.dm}min</div>
              </div>
              <div style={{textAlign:"right"}}>
                <span style={{fontSize:16}}>{w.ic}</span>
                <div style={{fontSize:10,color:"#6B7280"}}>{w.hi}°</div>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {s.acts.map((a,i)=>{const ac=ACTS.find(x=>x.id===a.type);return(
                <span key={i} style={{display:"flex",alignItems:"center",gap:3,background:"#1F293780",borderRadius:99,padding:"2px 8px",fontSize:10}}>{ac?.icon} {ac?.label} <LvlBadge level={a.al}/></span>
              )})}
            </div>
            {s.river&&<div style={{display:"flex",alignItems:"center",gap:8,marginTop:6,paddingTop:6,borderTop:"1px solid #1F293750"}}><span style={{fontSize:10,color:"#6B7280"}}>🌊 {s.river.cfs}cfs</span><StatusBadge status={s.river.status}/></div>}
          </div>
        )})}
        {(!results||!results.length)&&<div style={{textAlign:"center",padding:"60px 0",color:"#6B7280"}}>
          <div>No matches found.</div>
          <div style={{fontSize:10,marginTop:8}}>Try widening drive time or adventure level.</div>
        </div>}
      </div>
      <Nav v="plan" go={setV}/>
    </div>
  );

  // DETAIL
  if(v==="det"&&spot){
    const rg=REGIONS[spot.reg],w=wx(spot.reg,eMo);
    const act=spot.acts[actIdx];
    const combos=(spot.combos||[]).map(c=>({...c,sp:SPOTS.find(s=>s.id===c.id)})).filter(c=>c.sp);
    return(
      <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
        <div style={p}>
          <button onClick={()=>setV(results?"res":"spots")} style={{fontSize:12,color:"#6B7280",background:"none",border:"none",cursor:"pointer",marginBottom:12}}>← Back</button>
          <h2 style={{fontSize:24,fontWeight:900,margin:"0 0 2px"}}>{spot.name}</h2>
          <div style={{fontSize:10,color:"#6B7280",marginBottom:12}}>{rg.name}{spot.dm?" - "+spot.dm+"min":""} - {rg.elev}</div>

          {act&&act.trail&&<TrailMap activity={act}/>}
          {spot.acts.filter(a=>a.trail).length>1&&(
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              {spot.acts.map((a,i)=>{if(!a.trail)return null;const ac=ACTS.find(x=>x.id===a.type);return(
                <button key={i} onClick={()=>setActIdx(i)} style={{fontSize:10,padding:"4px 10px",borderRadius:99,border:actIdx===i?"1px solid #F59E0B":"1px solid #374151",background:actIdx===i?"#F59E0B18":"transparent",color:actIdx===i?"#FBBF24":"#6B7280",fontWeight:600,cursor:"pointer"}}>{ac?.icon} {ac?.label} L{a.al}</button>
              )})}
            </div>
          )}

          <div style={{...B,padding:12,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:24}}>{w.ic}</span>
                <div><span style={{fontSize:18,fontWeight:700}}>{w.hi}°</span><span style={{color:"#6B7280"}}>/{w.lo}°</span><div style={{fontSize:10,color:"#6B7280"}}>{dl(eDate)}</div></div>
              </div>
              <span style={{fontSize:10,color:"#6B7280"}}>💧{w.pr}%</span>
            </div>
          </div>

          {spot.river&&(
            <div style={{...B,padding:12,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:10,fontWeight:700,color:"#6B7280"}}>🌊 {spot.river.name}</span>
                <StatusBadge status={spot.river.status}/>
              </div>
              <div><span style={{fontSize:20,fontWeight:700,fontFamily:"monospace"}}>{spot.river.cfs}</span> <span style={{fontSize:12,color:"#6B7280"}}>cfs - {spot.river.trend}</span></div>
              <div style={{position:"relative",width:"100%",background:"#1F2937",borderRadius:99,height:8,marginTop:6}}>
                <div style={{position:"absolute",height:8,background:"#10B98140",borderRadius:99,left:(spot.river.ideal[0]/1500*100)+"%",width:((spot.river.ideal[1]-spot.river.ideal[0])/1500*100)+"%"}}/>
                <div style={{position:"absolute",width:10,height:10,background:"#FBBF24",borderRadius:99,top:-1,border:"2px solid #030712",left:Math.min(spot.river.cfs/1500*100,95)+"%"}}/>
              </div>
            </div>
          )}

          <div style={{...B,padding:12,marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Activities</div>
            {spot.acts.map((a,i)=>{const ac=ACTS.find(x=>x.id===a.type);return(
              <div key={i} onClick={()=>{if(a.trail)setActIdx(i)}} style={{borderBottom:i<spot.acts.length-1?"1px solid #1F293740":"none",padding:"8px 0",cursor:a.trail?"pointer":"default",background:actIdx===i&&a.trail?"#1F293730":"transparent",borderRadius:6,padding:"8px 4px",margin:"0 -4px"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:14}}>{ac?.icon}</span>
                  <span style={{fontSize:12,fontWeight:700}}>{ac?.label}</span>
                  <LvlBadge level={a.al}/>
                  {a.trail&&<span style={{fontSize:8,color:"#FBBF24",marginLeft:"auto"}}>📍 map</span>}
                </div>
                <div style={{fontSize:11,color:"#9CA3AF",marginLeft:24}}>{a.note}</div>
                {a.type==="fish"&&<div style={{marginLeft:24,marginTop:2}}><a href="https://ncpaws.org/PAWS/Fish/Stocking/Schedule/OnlineSchedule.aspx" target="_blank" rel="noopener" style={{fontSize:10,color:"#8B5CF6"}}>📋 Check NCWRC Stocking Schedule</a>{" "}<a href="https://www.ncpaws.org/ncwrcmaps/fishingareas" target="_blank" rel="noopener" style={{fontSize:10,color:"#8B5CF6"}}>🗺️ Trout Waters Map</a></div>}
              </div>
            )})}
          </div>

          {spot.stays&&spot.stays.length>0&&(
            <div style={{...B,padding:12,marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🌙 Where to Stay</div>
              {spot.stays.map((s,i)=><StayCard key={i} stay={s}/>)}
            </div>
          )}

          {spot.tips&&(
            <div style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#FBBF24",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>💡 Tips</div>
              <div style={{fontSize:11,color:"rgba(253,230,138,0.7)"}}>{spot.tips}</div>
              {spot.cell&&<div style={{fontSize:10,color:"rgba(253,230,138,0.4)",marginTop:4}}>📶 {spot.cell}</div>}
            </div>
          )}

          {combos.length>0&&(
            <div style={{...B,padding:12,marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>🔗 Combine With</div>
              {combos.map((c,i)=>(
                <div key={i} onClick={()=>openSpot({...c.sp,dm:null})} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0",cursor:"pointer"}}>
                  <div style={{display:"flex",gap:2}}>{[...new Set(c.sp.acts.map(a=>a.type))].map(t=>{const ac=ACTS.find(x=>x.id===t);return <span key={t} style={{fontSize:12}}>{ac?.icon}</span>})}</div>
                  <span style={{fontSize:12,fontWeight:600,color:"#D1D5DB"}}>{c.sp.name}</span>
                  <span style={{fontSize:10,color:"#6B7280",marginLeft:"auto"}}>{c.note}</span>
                </div>
              ))}
            </div>
          )}

          {spot.tags&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:12}}>{spot.tags.map(t=><span key={t} style={{fontSize:9,color:"rgba(251,191,36,0.5)",background:"rgba(251,191,36,0.05)",borderRadius:99,padding:"2px 8px"}}>#{t}</span>)}</div>}
          <button style={{width:"100%",...B,padding:"10px 0",fontWeight:600,fontSize:13,color:"#E5E7EB",cursor:"pointer"}}>📤 Share</button>
        </div>
        <Nav v="det" go={setV}/>
      </div>
    );
  }

  // CONDITIONS
  if(v==="cond") return(
    <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
      <div style={p}>
        <h2 style={{fontSize:24,fontWeight:900,marginBottom:12}}>Conditions</h2>
        <div style={{...B,padding:12,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🌊 Rivers</div>
          {Object.values(RIVERS).map((r,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<3?"1px solid #1F293740":"none"}}>
              <span style={{fontWeight:700,fontSize:13}}>{r.name}</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,fontFamily:"monospace",color:"#9CA3AF"}}>{r.cfs}cfs - {r.trend}</span><StatusBadge status={r.status}/></div>
            </div>
          ))}
        </div>
        <div style={{...B,padding:12,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🥾 Trails</div>
          {TRAIL_COND.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<3?"1px solid #1F293740":"none"}}>
              <span style={{width:10,height:10,borderRadius:5,background:t.c==="green"?"#10B981":t.c==="yellow"?"#F59E0B":"#EF4444"}}/>
              <span style={{flex:1,fontWeight:700,fontSize:13}}>{t.name}</span>
              <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:99,color:t.c==="green"?"#34D399":t.c==="yellow"?"#FBBF24":"#F87171",background:t.c==="green"?"#10B98118":t.c==="yellow"?"#F59E0B18":"#EF444418"}}>{t.st}</span>
            </div>
          ))}
        </div>
        <div style={{...B,padding:12}}>
          <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🌤️ Weather</div>
          {Object.entries(REGIONS).map(([k,r])=>{const w=wx(k,new Date().getMonth()+1);return(
            <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1F293740"}}>
              <div><div style={{fontWeight:700,fontSize:13}}>{r.name}</div><div style={{fontSize:10,color:"#6B7280"}}>{r.elev}</div></div>
              <div style={{textAlign:"right"}}><span style={{fontSize:18}}>{w.ic}</span><div style={{fontWeight:700,fontSize:13}}>{w.hi}°/{w.lo}°</div></div>
            </div>
          )})}
        </div>
      </div>
      <Nav v="cond" go={setV}/>
    </div>
  );

  // ALL SPOTS
  if(v==="spots") return(
    <div style={{background:"#030712",minHeight:"100vh",color:"#F3F4F6",paddingBottom:70}}>
      <div style={p}>
        <h2 style={{fontSize:24,fontWeight:900,marginBottom:16}}>All Spots</h2>
        {Object.entries(REGIONS).map(([rk,rg])=>{const sp=SPOTS.filter(s=>s.reg===rk);if(!sp.length)return null;return(
          <div key={rk} style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{rg.name}</div>
            {sp.map(s=>(
              <div key={s.id} onClick={()=>openSpot({...s,dm:null})} style={{...B,padding:10,marginBottom:6,cursor:"pointer"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:600,fontSize:13}}>{s.name}</span>
                  <div style={{display:"flex",gap:2}}>{[...new Set(s.acts.map(a=>a.type))].map(t=>{const ac=ACTS.find(x=>x.id===t);return <span key={t} style={{fontSize:12}}>{ac?.icon}</span>})}</div>
                </div>
                <div style={{display:"flex",gap:4,marginTop:4}}>{[...new Set(s.acts.map(a=>a.al))].sort().map(l=><LvlBadge key={l} level={l}/>)}</div>
              </div>
            ))}
          </div>
        )})}
      </div>
      <Nav v="spots" go={setV}/>
    </div>
  );

  return null;
}
