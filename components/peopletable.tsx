"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import PersonForm from "./personform";

const Peopletable = () => {
  const [persons, setPersons] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getPersons = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getpeople");
      const data = await response.json();
      setPersons(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  const deletePerson = async (email: string) => {

    try {
      const response = await fetch("/api/deletepeople", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });

      if (response.ok) {
        // Refresh the list after deletion
        getPersons();
        alert("Person deleted successfully!");
      } else {
        alert("Failed to delete person. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Close the delete confirmation dialog
        console.log("Closed");
    }
  };

  // console.log(persons)

  const sendEmail = (email: string, item: any) => {
    try {
      const subject = "Subject";
      const body = `selected person details:  
      name: ${item.name},
      phone: ${item.phone},
      email: ${item.email},
      hobbies: ${item.hobbies}`;
      const mailtoLink = `mailto:info@redpositive?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full mx-auto">
      {!loading ? (
        <>
          <Table>
            <TableCaption>A list of hobbies and interests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SN</TableHead>
                <TableHead className="">Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="">Hobbies</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {persons.map((item: any, index: any) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell className="">{item.email}</TableCell>
                  <TableCell className="">{item.hobbies}</TableCell>
                  <TableCell className="">
                    <span className="flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Button>Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <PersonForm data={item} />
                        </DialogContent>
                      </Dialog>
                      <Button onClick={() => sendEmail(item.email, item)}>
                        Send Email
                      </Button>
                      <Dialog>
                        <DialogTrigger>
                          <Button variant={"destructive"}>Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Person</DialogTitle>
                          </DialogHeader>
                          <DialogDescription className="flex flex-col flex-1">
                            Are you sure you want to delete this person?
                            <p className="text-red-500">
                              This action cannot be undone.
                            </p>
                          </DialogDescription>

                          <Button
                            variant={"destructive"}
                            onClick={() => deletePerson(item.email)}
                          >
                            Yes
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={50}>Total</TableCell>
                <TableCell className="text-right">{persons.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <div>
          <div>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-rose-600 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Peopletable;
