/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';


const Sidebar = () => {
     const pathname = usePathname();
     const { user } = useUser();


     return (
     <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
               <div className="flex flex-col items-center gap-4 mb-8">
                    {user?.imageUrl && (
                         <img
                              src={user.imageUrl}
                              alt={`${user.firstName} ${user.lastName} profile picture`}
                              width={48}
                              height={48}
                              className="rounded-full w-28 object-cover"
                         />
                    )}
                    <p className="text-lg font-semibold text-center mt-2">
                         {user?.firstName} {user?.lastName}
                    </p>
          </div>
          <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
               const isActive = pathname === item.route;
               
               return (
               <Link
               href={item.route}
               key={item.label}
               className={cn(
                    'flex gap-4 items-center p-4 rounded-lg justify-start',
                    {
                    'bg-blue-1': isActive,
                    }
               )}
               >
               <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={24}
                    height={24}
               />
               <p className="text-lg font-semibold max-lg:hidden">
                    {item.label}
               </p>
               </Link>
               );
          })}
          </div>
     </section>
     );
     };

export default Sidebar;