import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Groups from './Groups';
import Batches from './Batches';
import Subjects from './Subjects';
import Chapters from './Chapters';
import Topics from './Topics';

const Category = () => {
   return (
      <Tabs>
         <div className="flex items-center justify-between gap-6">
            <TabList className="flex items-center bg-slate-100 border-slate-200 border *:py-2 *:px-4 space-x-4 p-1 hover:*:cursor-pointer">
               <Tab>Batches</Tab>
               <Tab>Groups</Tab>
               <Tab>Subjects</Tab>
               <Tab>Chapters</Tab>
               <Tab>Topics</Tab>
            </TabList>

         </div>

         <TabPanel>
            <Batches />
         </TabPanel>
         <TabPanel>
            <Groups />
         </TabPanel>
         <TabPanel>
            <Subjects />
         </TabPanel>
         <TabPanel>
            <Chapters />
         </TabPanel>
         <TabPanel>
            <Topics />
         </TabPanel>
      </Tabs>
   );
};

export default Category;
